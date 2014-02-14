$(document).ready(function() {
	$("#navigationMenu").kendoMenu();
	var onClose = function() {
		basicEditButton.enable(true);
		};
	var bacisProfileWndw = $("#basicProfileWindow").kendoWindow({
		visible: false,
		width: "600px",
		title: "基本信息",
		actions: [
                  "Close"
              ],
		close: onClose,
	}).data("kendoWindow");
    var bscSaveButton = $("#basicProfileSave").kendoButton({
        spriteCssClass: "k-icon k-update"
    });
	var bscCancelButton = $("#basicProfileCancel").kendoButton({
		spriteCssClass: "k-icon k-cancel",
		click: function(e){
			bacisProfileWndw.close();
			basicEditButton.enable(true);
		}
    });
	var basicEditButton = $("#basicProfileEdit").kendoButton({
        spriteCssClass: "k-icon k-edit",
        click: function(e){
        	bacisProfileWndw.open();
        	basicEditButton.enable(false);
        }
    }).data("kendoButton");

kendo.init("#basicProfileEdit");

$("#birthdayPicker").birthdaypicker({
    dateFormat: "bigEndian",
    monthFormat: "long",
    placeholder: false,
    hiddenDate: false
  });

var crudServiceBaseUrl = "http://localhost:8080/ZoyoouWebService";
  var viewModel = kendo.observable({
      userProfileSource: new kendo.data.DataSource({
          transport: {
          	create:
          	{
          		type: "POST",
          		contentType: "application/json; charset=utf-8",
          		url: crudServiceBaseUrl + '/userservice',
          		dataType: "json"
          	},
              update:  
              {
              	type: "PUT",
              	contentType: "application/json; charset=utf-8",
              	url: crudServiceBaseUrl + '/userservice',
              	dataType: "json"
              },
              read: {
            	  type: "GET",
                  contentType: "application/json; charset=utf-8",
                  url: crudServiceBaseUrl + '/userservice/1',
                  dataType: "json"
              },
              parameterMap: function(options, operation) {
                  if (operation !== "read" && options) {
                  	return kendo.stringify(options);
                  	}
              }
          },
          schema: {
        	  model: {
                  id: "userId"
              }
          }
      }),
      hasChanges: false,
      save: function() {
          this.userProfileSource.sync();
          this.set("hasChanges", false);
      },
      change: function() {
          this.set("hasChanges", true);
      }
  });
  
  kendo.bind($(".userProfile"), viewModel);
  kendo.bind($("#basicProfileWindow"), viewModel);
});