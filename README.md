<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=250&color=a2d7d5&fontColor=363636&text=%EC%9E%90%EA%B0%88%EC%B9%98%20%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0%20%EA%B2%8C%EC%8B%9C%ED%8C%90" alt="header"/>
</div>

<div align="center">
    Node.js, Express, React를 사용해 만든 게시판
</div>

## 🛠️ 기술 스택 🛠️

<div align="center">
    <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
    <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
    <img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
    <img src="https://img.shields.io/badge/mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white">
    <br>
    <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
    <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
    <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
    <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
    <br>
    <img src="https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=white">
    <img src="https://img.shields.io/badge/pm2-2B037A?style=for-the-badge&logo=pm2&logoColor=white">
    <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">

</div>

<br>

## 🧰 개발 도구 🧰

<div align="center">
    <img src="https://img.shields.io/badge/VSCODE-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
    <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
    <img src="https://img.shields.io/badge/babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white">
    <img src="https://img.shields.io/badge/nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white">
     <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
</div>

<br>

## 📚 코멘트 📚

처음 해보는 풀스택 프로젝트여서 모르는 점도 많고, 부족한 점도 많았던 것 같다.

## 목차

1. [메인화면](#메인화면)
2. [회원 기능](#회원-기능)
   - [로그인](#1-로그인)
   - [회원가입](#2-회원가입)
   - [비밀번호 찾기](#3-비밀번호-찾기)
   - [회원 조회](#4-회원-조회)
   - [계정 정보 수정](#5-계정-정보-수정)
   - [비밀번호 수정](#6-비밀번호-수정)
3. [인증](#인증)
    - [이메일 인증](#1-이메일-인증)
    - [IP 인증](#2-ip-인증)
4. [게시판](#게시판)
    - [게시판 목록 조회](#1-게시판-목록-조회)
    - [게시글 제목+내용 검색](#2-게시글-제목내용-검색)
    - [인기순 정렬](#3-인기순-정렬)
    - [페이징](#4-페이징)
5. [글쓰기](#글쓰기)
    - [글, 사진, 동영상 등을 자유롭게 첨부 가능](#1-글-사진-동영상-등을-자유롭게-첨부-가능)
    - [작성 후 화면](#2-작성-후-화면)
6. [게시글 조회](#게시글-조회)
    - [게시글 기능들](#1-게시글-기능들)
    - [댓글 및 대댓글 작성 가능](#2-댓글-및-대댓글-작성-가능)
7. [오류 페이지](#오류-페이지)
    - [404 및 403 페이지](#1-404-및-403-페이지)
8. [그 외의 추가적인 특징들](#그-외의-추가적인-특징들)
    - [트래픽 제한](#1-트래픽-제한)
    - [https 지원](#2-https-지원)

## 메인화면

![메인 화면](https://github.com/bandall/Jagalchi-Community-Board/assets/32717522/388f2e47-8764-4e27-8e21-06d9f9ae143c)

**자갈치 게시판 메인 화면입니다.**

1. 메인 화면은 게시판 목록을 보여주는 화면입니다.
2. 게시판 목록은 게시판 이름, 게시글 수, 게시판 설명, 게시판 생성일을 보여줍니다.
3. 로그인/회원가입 버튼을 클릭하면 로그인/회원가입 화면으로 이동합니다.

<br>

![헤더](https://github.com/bandall/Jagalchi-Community-Board/assets/32717522/f1c3b9e1-22bb-4fde-8774-a5936baef462)

*자갈치 게시판 로그인 시 헤더입니다.*

1. 로그인 시 헤더는 계정 정보, 계정 정보 수정, 비밀번호 번경, 로그아웃으로 구성되어 있습니다.

<br>

## 회원 기능

### 1. 로그인

![로그인 화면](https://github.com/bandall/Jagalchi-Community-Board/assets/32717522/c0764ed4-066a-4f9e-8dd4-2333a761181d)

**자갈치 게시판 로그인 화면입니다.**

1. 로그인은 이메일과 비밀번호로 구성되어 있습니다.
2. 회원가입 버튼을 눌러 회원가입 화면으로 이동합니다.
3. 비밀번호 찾기 버튼을 눌러 비밀번호 찾기 화면으로 이동합니다.

### 2. 회원가입

![회원가입](https://github.com/bandall/Jagalchi-Community-Board/assets/32717522/a6bcf5f5-7be0-4b4e-8f2a-f65a1b55d705)

**자갈치 게시판 회원가입 화면입니다.**

1. 회원가입 화면은 이메일, 비밀번호, 닉네임를 입력합니다.
2. 하이퍼링크를 통해 로그인 화면과 비밀번호 찾기로 이동할 수 있습니다.
3. 새로 생성한 계정은 이메일 인증 후 사용할 수 있습니다.

### 3. 비밀번호 찾기

![비밀번호 찾기](https://github.com/bandall/Jagalchi-Community-Board/assets/32717522/561139ed-94fb-4f15-a325-a5fd5bd3effa)

**자갈치 게시판 비밀번호 찾기 화면입니다.**

![비밀번호 찾기 후 인증코드](https://github.com/bandall/Jagalchi-Community-Board/assets/32717522/01e33ddd-b98f-442b-b2e9-0cce5caff0b4)

**이메일로 인증 코드 전송 뒤 인증 화면입니다.**

1. 비밀번호 찾기 화면에 이메일을 입력하면 해당 이메일로 인증 코드를 전송합니다.
2. 인증 코드 인증에 성공할 경우 이메일로 임시 비밀번호를 전송합니다.

### 4. 회원 조회

![회원 조회](https://github.com/bandall/Jagalchi-Community-Board/assets/32717522/449c091e-54d9-4f26-a001-88cc373ba7c0)

**자갈치 게시판 회원 조회 화면입니다.**

1. 회원의 프로필 이미지, 작성한 게시글을 확인할 수 있습니다.

### 5. 계정 정보 수정

![계정 정보 수정](https://github.com/bandall/Jagalchi-Community-Board/assets/32717522/962e8162-47fa-4a1f-bbfb-6c8a73bd0106)

**자갈치 게시판 계정 정보 수정 화면입니다.**

1. 계정 정보 수정 화면에서는 닉네임, 프로필 이미지, 전화번호, 생년월일을 수정할 수 있습니다.

### 6. 비밀번호 수정

![비밀번호 수정](https://github.com/bandall/Jagalchi-Community-Board/assets/32717522/11896218-0114-4919-8f42-b7f9a288c38b)

**자갈치 게시판 비밀번호 수정 화면입니다.**

1. 비밀번호 수정 화면에서는 비밀변호를 변경할 수 있습니다.

## 인증

### 1. 이메일 인증

### 2. IP 인증

## 게시판

### 1. 게시판 목록 조회

![게시판 목록 조회](https://github.com/bandall/Jagalchi-Community-Board/assets/32717522/283e5502-5b72-4404-ace8-2d2b8c787f10)

**자갈치 게시판 게시글 화면입니다.**

1. 게시판 목록에서는 기본적으로 최신순으로 정렬되어 있습니다.
2. 게시글 검색과 인기순 정렬, 페이징 기능을 사용할 수 있습니다.

### 2. 게시글 제목+내용 검색

![게시글 검색](https://github.com/bandall/Jagalchi-Community-Board/assets/32717522/b273a5f7-e730-4ada-922e-360b5bf631cf)

**자갈치 게시판 게시글 검색 결과 화면입니다.**

1. 게시글 검색은 제목과 내용을 동시에 검색할 수 있습니다.
2. 검색된 게시글을 최신순으로 조회합니다.

### 3. 인기순 정렬

![인기순 정렬](https://github.com/bandall/Jagalchi-Community-Board/assets/32717522/af5482ac-5597-46f1-b607-c4fa82163b85)

**자갈치 게시판 인기순 정렬 화면입니다.**

1. 인기순 정렬은 조회수를 기준으로 정렬합니다.

### 4. 페이징

![페이징 구현](https://github.com/bandall/Jagalchi-Community-Board/assets/32717522/52956e6a-5744-4928-a6fb-32b8ae9b68f8)

**자갈치 게시판 페이징 예시 화면입니다.**

1. 최대 10 페이지까지 한 번에 넘길 수 있습니다.

## 글쓰기  

### 1. 글, 사진, 동영상 등을 자유롭게 첨부 가능

![게시글 작성1](https://github.com/bandall/Jagalchi-Community-Board/assets/32717522/6ec80b4b-a59a-434b-891a-cddb94b9c868)
![게시글 작성2](https://github.com/bandall/Jagalchi-Community-Board/assets/32717522/bddbc48e-4348-4650-b3e1-070c25b6a5bc)

**자갈치 게시판 게시글 작성 화면입니다.**

1. 게시글 작성 시 사진과 동영상을 첨부할 수 있습니다.
2. 사진과 동영상 첨부 이후 크기 조절이 가능합니다.
3. 프론트 지식 부족으로 버그가 가장 많은 부분입니다....ㅠㅠ

### 2. 작성 후 화면

![작성 후 사진](https://github.com/bandall/Jagalchi-Community-Board/assets/32717522/845f0723-a19b-4eaf-a744-e6cb46fd0437)

**자갈치 게시판 작성 후 화면입니다.**

1. 작성 후 사진은 작성한 게시글을 보여줍니다.

## 게시글 조회

### 1. 게시글 기능들

![게시글 메인](https://github.com/bandall/Jagalchi-Community-Board/assets/32717522/7cfe230a-280f-4d00-838e-1a7e7a1a1c41)

**게시글 두 번째 예시입니다.**

1. 게시글 작성자는 게시글을 수정 및 삭제할 수 있습니다.
2. 파란색 닉네임을 클릭하면 해당 유저의 프로필로 이동합니다.
3. 물고기 모양을 클릭하면 해당 게시글을 추천할 수 있습니다.
4. 링크 복사 버튼을 클릭하면 해당 게시글의 링크를 복사할 수 있습니다.
5. 오른쪽 상단에 조회수, 추천수와 댓글 수를 보여줍니다.

### 2. 댓글 및 대댓글 작성 가능  

![댓글1](https://github.com/bandall/Jagalchi-Community-Board/assets/32717522/bf837320-f463-4801-b1e9-f91be6cba9a6)

**댓글 작성 예시입니다.**

1. 댓글을 작성하고 등록할 수 있습니다.
2. 댓글 작성자만 댓글을 삭제할 수 있습니다.

![대댓글1](https://github.com/bandall/Jagalchi-Community-Board/assets/32717522/ff9ae055-8535-47d6-b254-f00af27b6617)

**대댓글 작성 예시입니다.**

1. 댓글에 대댓글을 작성하고 등록할 수 있습니다.
2. 대댓글 작성자만 대댓글을 삭제할 수 있습니다.

![대댓글2](https://github.com/bandall/Jagalchi-Community-Board/assets/32717522/2383a11e-c212-43e1-8646-faf7f4b14ab3)

**댓글 작성 예시입니다.**

1. 삭제된 댓글은 ```'삭제된 게시글입니다.'```라고 표시됩니다.

## 오류 페이지

### 1. 404 및 403 페이지

![오류 페이지](https://github.com/bandall/Jagalchi-Community-Board/assets/32717522/e1321c56-6bcf-4392-8022-99519c5846e6)

**자갈치 게시판 오류 페이지입니다.**

## 그 외의 추가적인 특징들  

1 . 트래픽 제한  
2 . https 지원  
