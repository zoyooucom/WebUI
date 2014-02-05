var crudServiceBaseUrl = "http://localhost:8080/ZoyoouWebService";

        $(document).ready(function() {
        	var User = kendo.data.Model.define({
          	  id: "uid",
          	  fields: {
          	    name: {
        	      validation: { required: true }
        	    },
        	    uid: {
            	      type: "guid",
            	      editable: false
            	},
          	    nickname: {
          	      validation: { required: true}
          	    },
          	    contactInfoId: {
          		  type: "number"
          	    },
          	    activeStatus: {
          	    	type: "number"
          	    }
          	  }
          	});
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
                        model: User,
                        type: "json"
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
            
            kendo.bind($(".profileContainer"), viewModel);
        });