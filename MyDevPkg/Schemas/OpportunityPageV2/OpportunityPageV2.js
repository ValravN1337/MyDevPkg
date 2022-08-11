 define("OpportunityPageV2", [], function() {
    return {
        entitySchemaName: "Opportunity",
        attributes: {
            "UsrDiff": {
                dataValueType: Terrasoft.DataValueType.FLOAT,
                dependencies: [
                    {
                        columns: ["Amount", "Budget"],
                        methodName: "calculateBalance"
                    }
                ]
            }
        },
        methods: {
            onEntityInitialized: function() {
                this.callParent(arguments);
                this.calculateBalance();
				this.set_type();
            },
			
			
			
			onOpenPrimaryContactClick: function() {
                var activeRow = this.get("ActiveRow");
                if (!activeRow) {
                    return;
                }
                var primaryId = this.get("GridData").get(activeRow).get("Owner").value;
                if (!primaryId) {
                    return;
                }
                var requestUrl = "CardModuleV2/ContactPageV2/edit/" + primaryId;
                this.sandbox.publish("PushHistoryState", {
                    hash: requestUrl
                });
            },
            isAccountPrimaryContactSet: function() {
                var activeRow = this.get("ActiveRow");
                if (!activeRow) {
                    return false;
                }
                var pc = this.get("GridData").get(activeRow).get("Owner");
                return pc ? true : false;
            },
			
			
			
			
			dueDateValidator: function() {
                var invalidMessage = "";
                if (this.get("Budget") < this.get("Amount")) {
                    invalidMessage = "fwqfwqfw";
                }
                return {
                    invalidMessage: invalidMessage
                };
            },
            setValidationConfig: function() {
                this.callParent(arguments);
                this.addColumnValidator("Budget", this.dueDateValidator);
                this.addColumnValidator("Amount", this.dueDateValidator);
            },
			set_type: function(){
				var responseValue = {
					displayValue: "Прямая продажа",
					value: 1
                            };
				this.set("Type",responseValue);
			},
            calculateBalance: function() {
                var amount = this.get("Amount");
                if (!amount) {
                    amount = 0;
                }
                var paymentAmount = this.get("Budget");
                if (!paymentAmount) {
                    paymentAmount = 0;
                }
                var result = paymentAmount - amount;
                this.set("UsrDiff", result);
            }
        },
        diff: /**SCHEMA_DIFF*/[
            {
                "operation": "insert",
                "parentName": "Header",
                "propertyName": "items",
                "name": "UsrDiff",
                "values": {
                    "bindTo": "UsrDiff",
                    "layout": {"column": 12, "row": 2, "colSpan": 12, "rowSpan": 1}
                }
            },
			
			{
                "operation": "insert",
                "parentName": "LeftActionButtonsContainer",
                "propertyName": "items",
                "name": "MainContactSectionButton",
                "values": {
                    itemType: Terrasoft.ViewItemType.BUTTON,
                    caption: { bindTo: "Resources.Strings.OwnerString" },
                    click: { bindTo: "onOpenPrimaryContactClick" },
                    enabled: { bindTo: "isAccountPrimaryContactSet" }
                }
            }
			
        ]/**SCHEMA_DIFF*/
    };
});