# 제 4회 데이터 경연대회 과제 수행 내역
1. 주제
  Agenda 1 : SKI BDC 인증서 진위여부 검증 및 거래
    S1. EV Battery의 핵심 데이터를 바탕으로 Battery 등급 판정
    S2. Battery 등급 판정에 대한 인증서 발급 정보와 인증서 File에 대한 Hash 값 저장
    S3. Battery 인증서에 대한 원본 진위 여부 검증 Smart Contract
    S4. 인증서 원본 진위여부가 검증 되면, EV Battery 거래 당사자간 Token 송금
    S5. Token 송금 여부 확인 되면, EV Battery 소유권 이전 Smart Contract

2. 구현범위
  - 세부 시나리오 중   
    S2. Battery 등급 판정에 대한 인증서 발급 정보와 인증서 File에 대한 Hash 값 저장
    S4. 인증서 원본 진위여부가 검증 되면, EV Battery 거래 당사자간 Token 송금
    을 기반으로 한 Contract 개발 완료

    /contracts/BatteryEvalContract.sol : Battery 등급 판정에 대한 인증서 발급 정보 관리를 위한 Contract 파일(ERC721 - openzeppelin)
    /contracts/BatteryPaymentToken.sol : Battery 인증서정보에 따른 Token Contract 파일(ERC20 - openzeppelin)

  - 해당 시나리오에 대한 DApp(Web 기반) 시나리오에 대해 일부 구축
    /src/batteryPaymentTokenApp.js : BatteryPaymentToken.sol 을 통해 구현된 Token에 대한 Event 처리를 위한 js 파일
    /src/etherApp.js : BatteryEvalContract.sol 을 통해 구현된 인증서 정보 등록, 등록된 인증서 정보 조회 등의 Event 처리를 위한 js 파일
    /src/server.js : 기능별로 구현된 js 를 import 하여, web-server 방식으로 서비스를 제공하는 js 파일
                     전체 기능이 구현되어 있지 않고, 인증서 파일에 대한 hash 작업을 위한 multer library 연계작업만 구현
                     multer library를 통한 파일 처리 후, crypto library를 통해, 파일명에 대한 hex string을 생성하여 차후 인증서 정보 저장 시 사용

3. 구현결과
  - 구축 Framework 및 주요 Library
    nodejs v14.15.0
    truffle v.5.1.52 (core : 5.1.52)
    Solidity v.0.6.2
    Web3.js v.1.2.9
    Ganache-Cli v.6.12.1(ganache-core : 2.13.1)
    openzeppelin v3.2.0

  - 실행방법
    a. Contract 배포
       개발(로컬) : truffle migrate --network development
       TestNet : truffle migrate --network besuTest
       MainNet : truffle migrate --network besu
    b. 수행방법
       TestNet : node tokenTransactionTest.js

  - 상세결과
    a. 개발(로컬)의 경우, truffle + ganache-cli 기반 contract 배포 확인완료
    b. TestNet의 경우, truffle 기반 TestNet 설정을 통해 Contract는 배포가 완료되었으나,
       테스트 수행 시, 정상적으로 Transaction 결과가 전달되지 않는 현상 확인
       실제 배포를 통한 Transaction Hash 등에 대해서는 첨부파일을 통해 확인    

  


    


