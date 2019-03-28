
var allUsers= new Map();
var allGroups= new Map();
var allRights = new Map();
var sessions = new Map();

function createUser(username, password) {
	if(username.length != 0 && password.length !=0){
		if(allUsers.has(username)){
			throw new Error("Такой пользователь уже есть!");
		}
			allUsers.set(username, password);
		 	
		 	return username;
			
		
	 }else{
		throw new Error("Введите значение");
	}
		 
	

};



function users() {

	var arrUsers=[];	
		
			for(var nickname of allUsers.keys()){

					 arrUsers.push(nickname);
					 
			}
			
		
			return arrUsers;
	};


 function deleteUser(username) {
	if(username.length !=0){

		if(!allUsers.has(username))
	   	    {
	   	       throw new Error("Не существует");   		
   	        }

		   	allUsers.delete(username);
	}else
	{
		throw new Error("Введите пользователя");   
	}
	
};


function createGroup() {

	let group = str_rand();
	if(group.length != 0){
		if(allGroups.has(group)){
			throw new Error("Такая группа уже есть");  
		}

		allGroups.set(group,[]);

	}else
	{
		throw new Error("Пустое значение группы");  
	  
	}
	return group;	
};





function deleteGroup(group) {

	if(group.length !=0){

		if(!allGroups.has(group))
	   	    {
	   	       throw new Error("Группы не существует");   		
   	        }

		   	
			allGroups.delete(group);
	}else
	{
		throw new Error("Введите название группы ");   
	}
};

function groups() {

	let groups = [];
	for(let group of allGroups.keys()){

		groups.push(group);
						 
				}
		
			
	    return groups;

};

function addUserToGroup(username, group) {
	
	if (username.length == 0){
        throw new Error("Введите имя");
    }
	if (group.length == 0){
        throw new Error("Введите название группы");
    }
     
     if (!allUsers.has(username)){
        throw new Error('Имя '+ username + ' не существует!');
    }
    if (!allGroups.has(group)){
        throw new Error('Группы ' + group + ' не существует!');
    }
    if (allGroups.get(group).includes(username)){
        throw new Error("Пользователь "+username+"уже есть ы группе "+group);
    }

    for (var [key,value] of allGroups.entries()) {
    	
    	
    		value.push(username);
    		
    	}

};

function userGroups(username) {
	 let userGroups = [];

    if (username.length == 0){
        throw new Error("Username empty");
    }
    if (!allUsers.has(username)){
        throw new Error("No user found");
    }
    for (let group of allGroups.keys()){
        // for (let i = 0, elem = allGroups.get(group); i < allGroups.get(group).length; i++){
        //     if (elem[i] == username){
                userGroups.push(group);
            // }
        // }
    }

    return userGroups;
};

function removeUserFromGroup(username, group) {
	 if (username.length == 0){
        throw new Error("Пустое имя");
    }
    if (group.length == 0){
        throw new Error("Пустая группа");
    }
    if (!allUsers.has(username)){
        throw new Error("Нет имени");
    }
    if (!allGroups.has(group)){
        throw new Error("Такой группы не существует");
    }
    if (!allGroups.get(group).includes(username)){
        throw new Error("Нет такого пользователя в группе");
    }
    
       allGroups.get(group).splice(allGroups.get(group).indexOf(username));
};

function createRight() {
	var right = str_rand();

    if (right.length != 0){
        if (allRights.has(right)){
            throw new Error("Право уже определено");
        }
        allRights.set(right, []);
    }else{
        throw new Error("Нет права");
    }
    
    return right;
};

function deleteRight(right) {
	if(right.length !=0){

		if(!allRights.has(right))
	   	    {
	   	       throw new Error("Право не существует");   		
   	        }

		   	
			allRights.delete(right);
	}else
	{
		throw new Error("Введите название right ");   
	}
};

function groupRights(group) {
	let groupRights = [];

    if (group.length == 0){
        throw new Error("Пустая группа");
    }
    if (allRights.length == 0){
        throw new Error("нет права");
    }
    if(!allGroups.has(group)){
        throw new Error("Нет такой группы");
    }
    for (let right of allRights.keys()){
        for (let i = 0, elem = allRights.get(right); i < allRights.get(right).length; i++){
            if (elem[i] == group){
                groupRights.push(right);
            }
        }
    }
    return groupRights;

};

function rights() {
	let rights = [];
	for(let right of allRights.keys()){

		rights.push(right);
						 
		}
		
			
	    return rights;
};

function addRightToGroup(right, group) {
	 if (right.length == 0){
        throw new Error("Пустое право");
    }
    if (group.length == 0){
        throw new Error("Нет имени группы");
    }
    if (!allRights.has(right)){
        throw new Error("Нет права");
    }
    if(!allGroups.has(group)){
        throw new Error("Нет такой группы");
    }
    if(allRights.get(right).includes(group)){
        throw new Error("не в одной группе не найдено");
    }
    // for(value of values()){
    // 	value.push(group);
    // }
    allRights.get(right).push(group);
};

function removeRightFromGroup(right, group) {
	 if (right.length == 0){
        throw new Error("Right Пустое");
    }
    if (group.length == 0){
        throw new Error("Имя группы пустое");
    }
    if (!allRights.has(right)){
        throw new Error("Нет такого права");
    }
    if (!allGroups.has(group)){
        throw new Error("Нет такой группы");
    }
    if(!allRights.get(right).includes(group)){
        throw new Error("Нет группы для этого права");
    }
    allRights.get(right).splice(allRights.get(right).indexOf(group));
};

function login(username, password) {
	 if (!sessions.has(username)){
        sessions.set(username, false);
    }

    let connect = false;

    if (allUsers.has(username)){
        if (allUsers.get(username) === password){
            if (sessions.get(username) == false){
                sessions.set(username, true);
                connect = true;
            }else {
                connect = false;
            }
        } else {
            connect = false;
        }
    }else {
        connect = false
    }

    return connect;
};

function currentUser() {
	 let current;
    for (let user of sessions.keys()){
        current = user;
    }
    return current;
};

function logout(username, right) {
	if (sessions.size != 0){
        sessions.clear();
    }
};

function isAuthorized(user, right) {
	let final = false;
    let userGroups = [];

    if (username.length == 0){
        throw new Error("Пустой логин");
    }
    if (right.length == 0){
        throw new Error("Право пустое");
    }
    if (!allUsers.has(username)){
        throw new Error("Нет такого юзера");
    }
    if (allGroups.size == 0){
        throw new Error("Группы пустые");
    }
    if (!allRights.has(right)){
        throw new Error("нет такого права");
    }

    for (let group of allGroups.keys()){
        for (let i = 0, elem = allGroups.get(group); i < allGroups.get(group).length; i++){
            if (elem[i] == username){
                userGroups.push(group);
            }
        }
    }

    let userRights = [];

    for (let right of allRights.keys()){
        for (let i = 0, elem = allRights.get(right); i < allRights.get(right).length; i++){
            for (let j = 0; j < userGroups.length; j++){
                if (userGroups[j] == elem[i]){

                    userRights.push(right);
                }
            }
        }
    }

    if (userRights.includes(right)){
        final = true;
    }else{
        final = false;
    }
    return final;
};






function str_rand() {         
	var result = '';        
	 var words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';   
	 var max_position = words.length - 1;            
	 	for( i = 0; i < 5; ++i ) { 
	 		position = Math.floor ( Math.random() * max_position );
	 		result += words.substring(position, position + 1);
	 		    }   

	 		     return result;  
	 		  

};

