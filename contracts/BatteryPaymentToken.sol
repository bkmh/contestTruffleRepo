pragma solidity ^0.6.2;

// import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

import "/usr/lib/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

// import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

// import "/usr/lib/node_modules/@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

// import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

// import "/usr/lib/node_modules/@openzeppelin/contracts/ownership/Ownable.sol";

contract BatteryPaymentToken is ERC20 {

    // Define constants
	// string public constant _name = "BatteryPaymentToken";
	// string public constant _symbol = "BPT";
	// uint8  public constant decimals = 18;
	// uint256 public constant totalSupply = 10000000000 * (10 ** uint(decimals));

    // constructor () ERC20Detailed(_name, _symbol, _decimals) public {
    constructor (string memory name, string memory symbol, uint8 decimals, uint256 totalSupply) ERC20(name, symbol) public {

        // solidity 에서 string 비교는 불가하므로 두 string의 hash값을 비교하는 방식도 좋음
        //require(name != "", "Name is not input");
        //require(symbol != "", "Symbol is not input");

        _setupDecimals(decimals);

        // mint -> 해당 token의 발행
        _mint(msg.sender, totalSupply);
    }

}