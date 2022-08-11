 define("EmployeeSection", ["ProcessModuleUtilities"], function(ProcessModuleUtilities) {
	return {
		entitySchemaName: "Employee",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
						{
				"operation": "insert",
				"name": "NewEmpBTN",
				"values": {
					"itemType": 5,
					"caption": "Создать нового сотрудника",
					"style": "green",
					"visible": true,
					"enabled": true,
					"click": {
						"bindTo": "callCustomProcess"
					}
				},
				"parentName": "ActionButtonsContainer",
				"propertyName": "items",
				"index": 3
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			callCustomProcess: function() {
                var args = {
                    // Имя процесса, который необходимо запустить.
                    sysProcessName: "UsrCreateNewEmployeeCustom2",
                    // Объект со значением входящего параметра ContactParameter для процесса CustomProcess.
                };
				ProcessModuleUtilities.executeProcess(args);
            }
		}
	};
});
