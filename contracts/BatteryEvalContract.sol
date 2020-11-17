pragma solidity ^0.6.2;

import "/usr/lib/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract BatteryEvalContract is ERC721 {

    constructor() ERC721("BatteryEvalContract", "BEC") public {

    }

    // Battery 정보 등록 이벤트
    event NewBattery(uint batteryId, string batteryOwner, string batteryManuFacturer, string batteryModelName, string batteryManuFactureDate, string certiFileName);

    struct BatteryEvalInfo {   // 소유자, 배터리생산자, 배터리모델명, 배터리생산일자, 인증서파일명
        string batteryOwner;
        string batteryManuFacturer;
        string batteryModelName;
        string batteryManuFactureDate;
        string certiFileName;

        // 특장점 추출 결과를 저장하기 위한 추가 변수 또는 저장소 추가 필요
        // AI 호출 수행결과가 특장점 LIST(또는 Array) 로 저장되므로, 해당 저장값을 데이터로 관리해야 함
        // -> 파일로 저장, 파일명은 upload image 파일명과 동일하게 저장
    }

    // Baby 등록 배열
    BatteryEvalInfo[] public batteries;

    // babies Index 입력 -> Baby 등록 Address 출력
    mapping (uint => address) public batteryToOwner;

    // 파일명 입력 -> babies Index 출력
    mapping (string => uint) public filenameToBatteryEvalResult;

    // Baby 등록
    function addBatteryEvalInfo(string memory _owner, string memory _manufacturer, string memory _modelName, string memory _manufactureDate, string memory _certiFile) public {
        // 여기서 -1이 왜 필요하지? -> 실제로 push 결과에 대해 확인하므로 아마도 push 후 데이터에 대한 작업 수행 결과이므로 이전 결과로 return하는 것으로 판단됨.
        // uint batteryId = batteries.push(BatteryEvalInfo(_owner, _manufacturer, _modelName, _manufactureDate, _certiFile));

        batteries.push(BatteryEvalInfo(_owner, _manufacturer, _modelName, _manufactureDate, _certiFile));

        uint batteryId = batteries.length - 1;
        
        batteryToOwner[batteryId] = msg.sender;   // babyToOwner 매핑
        filenameToBatteryEvalResult[_certiFile] = batteryId;   // imageToBaby 매핑
        emit NewBattery(batteryId, _owner, _manufacturer, _modelName, _manufactureDate, _certiFile);  // 이벤트 발생
    }

    // babies length 출력
    function getBatteriesCount() public view returns (uint count) {
        return batteries.length;
    }

    // babies Index 입력 ->  Baby 객체 내 전 항목 값 출력
    function getBatteryInfoById(uint _batteryId) public view returns (
        string memory bOnwer, string memory bManuFacturer, string memory bModelName, string memory bManuFactureDate, string memory cFileName) {
        // babies Indes는 babies length 보다 작아야함
        require(_batteryId < batteries.length, "Wrong ID value.");

        // 항목 출력
        bOnwer = batteries[_batteryId].batteryOwner;
        bManuFacturer = batteries[_batteryId].batteryManuFacturer;
        bModelName = batteries[_batteryId].batteryModelName;
        bManuFactureDate = batteries[_batteryId].batteryManuFactureDate;
        cFileName = batteries[_batteryId].certiFileName;
    }

    // 파일명 입력 ->  Baby 객체 내 전 항목 값 출력
    // function getBabyByFilename(string memory _filename) public view returns (
    //     string memory types, string memory filename, string memory name, string memory phoneNumber, string memory etcSpfeatr, uint age) {
    //     // 입력된 파일명과 찾은 파일명이 맞는지 확인
    //     uint _id = filenameToBaby[_filename];
    //     require(compareStrings(_filename, babies[_id].filename), "The filename entered does not exist.");
    //     // 항목 출력
    //     types = babies[_id].types;
    //     filename = babies[_id].filename;
    //     name = babies[_id].name;
    //     phoneNumber = babies[_id].phoneNumber;
    //     etcSpfeatr = babies[_id].etcSpfeatr;
    //     age = babies[_id].age;
    // }

    // string 값 비교 함수
    function compareStrings (string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
    }
}