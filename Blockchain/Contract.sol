// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;


contract local {
    
    address payable owner;

    struct User{
        string name;
        string userName;
        string[] imageId; 
        string[] imageName;    
    }


    mapping (address=>User) public  users;
    uint public noOfUsers;


    //register user

    function register(string memory _name,string memory _userName) payable public  {
        require(msg.value==0.001 ether,"Please pay 0.001 ether");

        User storage newUser = users[msg.sender];
        noOfUsers++;
        newUser.name= _name;
        newUser.userName = _userName;
    }

    //after upload files on ipfs thei hash will be stored in ipfs and the id of docuemnt will be stored in my contract and will storea ll user stuff here only 

    function uploadImage(string memory _imageId,string memory _imageName) public payable returns(bool){

        if(msg.value==0.0001 ether){
            User storage thisUser = users[msg.sender];
            thisUser.imageId.push(_imageId);
            thisUser.imageName.push(_imageName);
            return true;

        }else{
            return false;
        }
    }


    function getUser() public view  returns(User memory){
        User storage thisUser = users[msg.sender];
        return thisUser;
    }


} 