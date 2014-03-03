var crudServiceBaseUrl = "http://localhost:8080/ZoyoouWebService/userservice";
$(document).ready(function() {
	var userModel = kendo.observable({
        agreed: false,
        confirmed: false,
        register: addUser()
    });

    kendo.bind($("#signup"), userModel);
});

$('#register').click(function() {
	addUser();
	return false;
});

function addUser() {
	console.log('addUser');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: crudServiceBaseUrl,
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('User created successfully');
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('add User error: ' + textStatus);
		}
	});
}

function formToJSON() {
	var userName = $('#username').val();
	var defaultUserRoleId = 4;
	return JSON.stringify({
		"userName": userName == "" ? null : wineId, 
		"pwd": $('#password').val(), 
		"communityRelation": {
			"community":{
				"communityId":$('#communityid').val(),
				"role":{
					"roleId":defaultUserRoleId
				}
			}
		}
		});
	//return JSON.stringify({"userName":"LiYang_Test9","pwd":"123456","communityRelation":{"community":{"communityId":1},"role":{"roleId":4}}});
}