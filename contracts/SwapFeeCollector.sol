// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface ISwapRouter {
    struct ExactInputSingleParams {
        address tokenIn;
        address tokenOut;
        uint24 fee;
        address recipient;
        uint256 deadline;
        uint256 amountIn;
        uint256 amountOutMinimum;
        uint160 sqrtPriceLimitX96;
    }

    function exactInputSingle(ExactInputSingleParams calldata params) external payable returns (uint256 amountOut);
}

interface IWETH {
    function deposit() external payable;
    function withdraw(uint256) external;
    function balanceOf(address) external view returns (uint256);
}

contract SwapFeeCollector is Ownable {
    IERC20 public gameToken;
    ISwapRouter public swapRouter;
    IWETH public weth;
    address public treasury;

    uint256 public threshold = 10000 * 10**18;
    uint256 public totalBuyback;

    event BuybackExecuted(uint256 tokenAmount, uint256 burnAmount, uint256 treasuryAmount);

    constructor(
        address _gameToken,
        address _swapRouter,
        address _weth,
        address _treasury
    ) Ownable(msg.sender) {
        gameToken = IERC20(_gameToken);
        swapRouter = ISwapRouter(_swapRouter);
        weth = IWETH(_weth);
        treasury = _treasury;
    }

    receive() external payable {}

    function executeBuyback() external {
        uint256 tokenBalance = gameToken.balanceOf(address(this));
        require(tokenBalance >= threshold, "Below threshold");

        gameToken.approve(address(swapRouter), tokenBalance);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
            tokenIn: address(gameToken),
            tokenOut: address(weth),
            fee: 3000,
            recipient: address(this),
            deadline: block.timestamp,
            amountIn: tokenBalance,
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0
        });

        uint256 wethReceived = swapRouter.exactInputSingle(params);

        weth.approve(address(swapRouter), wethReceived);

        ISwapRouter.ExactInputSingleParams memory buybackParams = ISwapRouter.ExactInputSingleParams({
            tokenIn: address(weth),
            tokenOut: address(gameToken),
            fee: 3000,
            recipient: address(this),
            deadline: block.timestamp,
            amountIn: wethReceived,
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0
        });

        uint256 tokensBought = swapRouter.exactInputSingle(buybackParams);

        uint256 burnAmount = tokensBought / 2;
        uint256 treasuryAmount = tokensBought - burnAmount;

        gameToken.transfer(address(0xdead), burnAmount);
        gameToken.transfer(treasury, treasuryAmount);

        totalBuyback += tokensBought;

        emit BuybackExecuted(tokensBought, burnAmount, treasuryAmount);
    }

    function setThreshold(uint256 _threshold) external onlyOwner {
        threshold = _threshold;
    }

    function setTreasury(address _treasury) external onlyOwner {
        treasury = _treasury;
    }

    function withdrawETH() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
