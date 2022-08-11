 define("AccountSectionV2", [], function() {
    return {
        entitySchemaName: "Account",
        methods: {
            onOpenPrimaryContactClick: function() {
                var activeRow = this.get("ActiveRow");
                if (!activeRow) {
                    return;
                }
                var primaryId = this.get("GridData").get(activeRow).get("PrimaryContact").value;
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
                var pc = this.get("GridData").get(activeRow).get("PrimaryContact");
                return pc ? true : false;
            }
        },
        diff: /**SCHEMA_DIFF*/[
            {
				"operation": "insert",
				"name": "CountButton",
				"values": {
					"itemType": 5,
					"caption": {
                        "bindTo": "Resources.Strings.OwnerFilterCaption"
                    },
					"style": "green",
					"visible": true,
					"enabled": true,
					"click": {
						"bindTo": "OnButtonClick"
					}
				},
				"parentName": "SeparateModeActionButtonsLeftContainer",
				"propertyName": "items",
				"index": 3
			},
        ]/**SCHEMA_DIFF*/
    };
});