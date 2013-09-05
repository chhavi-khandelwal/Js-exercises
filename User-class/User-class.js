function User(name, age) {
	this.name = name;
	this.age = age;  
}
User.prototype = {
	constructor : User,
    compare : function(user2) {
	if (this.age == user2.age) 
        alert (this.name + " and " + user2.name + " have the same age. ");
	else
	if (this.age > user2.age)
		alert (this.name +" is older than " + user2.name);
	else
		alert (user2.name + " is older than " + this.name);
    }
};
var user1 = new User("John", 49);
var user2 = new User("Mary", 40);
user1.compare(user2);