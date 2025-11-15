// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract RouletteGame is Ownable, ReentrancyGuard {
    IERC20 public gameToken;

    uint256 public minBet = 1 * 10**18;
    uint256 public maxBet = 100 * 10**18;
    uint256 public houseBalance;
    uint256 public collectedFees;
    uint256 private nonce;
    bool public paused;

    uint256 constant FEE_PERCENTAGE = 1;
    uint256 constant PAYOUT_MULTIPLIER = 98;

    event GamePlayed(
        address indexed player,
        uint256 betAmount,
        bool choice,
        bool result,
        uint256 payout
    );
    event HouseFunded(address indexed funder, uint256 amount);
    event FeesWithdrawn(address indexed owner, uint256 amount);

    constructor(address _gameToken) Ownable(msg.sender) {
        gameToken = IERC20(_gameToken);
    }

    function placeBet(uint256 amount, bool isBlack) external nonReentrant {
        require(!paused, "Game is paused");
        require(amount >= minBet && amount <= maxBet, "Invalid bet amount");
        require(gameToken.balanceOf(msg.sender) >= amount, "Insufficient balance");
        require(houseBalance >= amount * 2, "Insufficient house balance");

        require(
            gameToken.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        uint256 fee = (amount * FEE_PERCENTAGE) / 100;
        uint256 effectiveBet = amount - fee;
        collectedFees += fee;

        nonce++;
        uint256 random = uint256(keccak256(abi.encodePacked(
            blockhash(block.number - 1),
            msg.sender,
            block.timestamp,
            nonce
        )));

        bool result = random % 2 == 0;
        uint256 payout = 0;

        if (result == isBlack) {
            payout = (effectiveBet * PAYOUT_MULTIPLIER) / 100 + effectiveBet;
            require(gameToken.transfer(msg.sender, payout), "Payout failed");
            houseBalance -= (payout - effectiveBet);
        } else {
            houseBalance += effectiveBet;
        }

        emit GamePlayed(msg.sender, amount, isBlack, result, payout);
    }

    function fundHouse(uint256 amount) external {
        require(
            gameToken.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        houseBalance += amount;
        emit HouseFunded(msg.sender, amount);
    }

    function withdrawFees() external onlyOwner {
        uint256 amount = collectedFees;
        require(amount > 0, "No fees to withdraw");
        collectedFees = 0;
        require(gameToken.transfer(msg.sender, amount), "Transfer failed");
        emit FeesWithdrawn(msg.sender, amount);
    }

    function setMinMaxBet(uint256 _minBet, uint256 _maxBet) external onlyOwner {
        require(_minBet < _maxBet, "Invalid bet limits");
        minBet = _minBet;
        maxBet = _maxBet;
    }

    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
    }

    function emergencyWithdraw() external onlyOwner {
        uint256 balance = gameToken.balanceOf(address(this));
        require(gameToken.transfer(msg.sender, balance), "Transfer failed");
        houseBalance = 0;
        collectedFees = 0;
    }
}
