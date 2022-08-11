define("UsrSwim1Page", ["ProcessModuleUtilities"], function(ProcessModuleUtilities) {
	return {
		entitySchemaName: "UsrSwim",
		messages: {
			/* Сообщение, которое вызывает обновление детали. */
			"AddingTrainings": {
				"mode": Terrasoft.MessageMode.BROADCAST,
				"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		attributes: {
			"responseCollectionTrainings":
			{
				"dataValueType": Terrasoft.DataValueType.INTEGER,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"maximumDailyActiveSections":
			{
				"dataValueType": Terrasoft.DataValueType.INTEGER,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"UsrSchema6e59d901Detail2aabd984": {
				"schemaName": "UsrSchema6e59d901Detail",
				"entitySchemaName": "UsrSwimSession",
				"filter": {
					"detailColumn": "UsrSwimProgramm",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"UsrSwimOwner": {
				"955ab12c-7738-4cf2-864c-98bb9bc87a81": {
					"uId": "955ab12c-7738-4cf2-864c-98bb9bc87a81",
					"enabled": true,
					"removed": false,
					"ruleType": 1,
					"baseAttributePatch": "Type",
					"comparisonType": 3,
					"autoClean": false,
					"autocomplete": false,
					"type": 0,
					"value": "60733efc-f36b-1410-a883-16d83cab0980",
					"dataValueType": 10
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			
			
			init: function() {
				this.callParent(arguments);
				/* Подписка на сообщение, которое вызывает обновление детали. */
				this.sandbox.subscribe("AddingTrainings", this.updateTrainings, this);
			},
			/* Добавляет действие в меню действий. */
			getActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": {bindTo: "Resources.Strings.AddTrainingsActionCaption"},
					// Определяем метод-обработчик для действия.
					"Click": {bindTo: "getBusinessProcessAddTrainings"},
					"Enabled": true
				}));
				return actionMenuItems;
			},
			/* Вызывает обновление детали на странице записи. */
			updateTrainings: function() {
				this.updateDetail({
					// Код детали.
					"detail": "UsrSchema6e59d901Detail2aabd984",
					"reloadAll": true
				});
			},
			/* Метод-обработчик для нового действия в меню. */
			getBusinessProcessAddTrainings: function() {
				/* Получаем необходимые для процесса входящие параметры. */
				var id = this.get("Id");
				var periodicity = this.get("UsrSwimPeriodicity").displayValue;
				var coach = this.get("UsrSwimOwner").value;
				if (!periodicity) {
					return;
				}
				/* Создаем конфигурационный объект для запуска процесса. */
				var args = {
					/* Имя созданного в предыдущих пунктах процесса. */
					sysProcessName: "UsrDevProcess",
					/* Входящие параметры процесса. */
					parameters: {
						ProcessSchemaId: id,
						ProcessSchemaPeriodicity: periodicity,
						ProcessSchemaCoach: coach
					}
				};
				/* Запуск процесса. */
				ProcessModuleUtilities.executeProcess(args);
			},
			
			
			         /* Запускается при загрузке схемы страницы и вызывает метод подсчета текущего количества активных ежедневных секций и метод считывания значения системной настройки. */
            onEntityInitialized: function(){
                this.callParent(arguments);
                this.getPeriodicityActiveNumber();
                this.getMaximumDailyActiveSections();

            },
			
			
			
			
			
		
			
			
            /* Вычисляет текущее количество активных ежедневных секций и записывает полученное значение в атрибут "responseCollectionTrainings". */
            getPeriodicityActiveNumber: function() {
                var periodicity = "Ежедневно";
                var esqPeriodicity = this.Ext.create("Terrasoft.EntitySchemaQuery", {
                    rootSchemaName: "UsrSwim"
                });
                esqPeriodicity.addColumn("UsrSwimName");
                var groupFilters = this.Ext.create("Terrasoft.FilterGroup");
                var filterPerodicity = this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL, "UsrSwimPeriodicity.Name", periodicity);
                var thisId = this.get("Id");
                var filterId = this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.NOT_EQUAL, "Id", thisId);
                var filterIsActive = this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL, "UsrSwimIsActive", true);
                groupFilters.addItem(filterPerodicity);
                groupFilters.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
                groupFilters.addItem(filterIsActive);
                groupFilters.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
                groupFilters.addItem(filterId);
                esqPeriodicity.filters.add(groupFilters);
                esqPeriodicity.getEntityCollection(function(result) {
                    if (!result.success) {
                        this.showInformationDialog("Request error");
                        return;
                    }
                    else {
                        var lengthCollection = result.collection.collection.length;
                        this.set("responseCollectionTrainings", lengthCollection);
                    }
                }, this);
            },
            /* Добавляет валидацию к полю "Периодичность". При изменении данного поля либо сохранении записи будет вызываться метод-валидатор. */
            setValidationConfig: function() {
                this.callParent(arguments);
                this.addColumnValidator("UsrSwimPeriodicity", this.periodicityValidator);
            },
            /* Метод-валидатор — если секция ежедневная, сравнивает текущее количество активных ежедневных секций с системной настройкой "GymsNumber" и в случае превышения добавляет в поле "Периодичность" предупреждающее сообщение. Сохранение записи в таком случае невозможно. */
            periodicityValidator: function() {
                var invalidMessage= "";
                var periodicity = this.get("UsrSwimPeriodicity").displayValue;
                if (periodicity==="Ежедневно") {
                    var isActive = this.get("UsrSwimIsActive");
                    var myVariable = this.get("maximumDailyActiveSections");
                    var lengthCollection = this.get("responseCollectionTrainings");
                    if (lengthCollection >= myVariable && isActive) {
                        invalidMessage = "Количество ежедневных программ плавания ограничено, не более " + myVariable + " программ";
                    }
                }
                else {
                    invalidMessage = "";
                }
                return {
                    invalidMessage: invalidMessage
                };
            },
            /* Получает значение системной настройки "GymsNumber". */
            getMaximumDailyActiveSections: function() {
                var myVariable;
                var callback = function(value) {
                    myVariable = value;
                };
                this.Terrasoft.SysSettings.querySysSettingsItem("SwimsNumber", callback, this);
                if (myVariable === undefined) {
                    return;
                }
                else {
                    this.set("maximumDailyActiveSections", myVariable);
                }
            }
			
			
			
			
			
			
			
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "UsrSwimName914b8389-dc54-47f7-abd9-4b111e93381e",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrSwimName"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrSwimCode6bc31bad-29b8-4fb9-ad57-5718ea1b31cc",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrSwimCode"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrSwimOwner7ffc80e9-3478-4968-a8ff-2e4a255832fa",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrSwimOwner"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrSwimPeriodicitybf7177be-eec5-4f72-90a3-679d07c67b8c",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrSwimPeriodicity"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "UsrSwimIsActive1640d132-68cc-42c9-9e71-5f16d01e424e",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrSwimIsActive"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "UsrNotes15f20154-15f7-41e7-befe-b3980c03e720",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrNotes"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 0
				}
			},
			{
				"operation": "insert",
				"name": "UsrSchema6e59d901Detail2aabd984",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "ESNTab",
				"propertyName": "items",
				"index": 1
			}
		]/**SCHEMA_DIFF*/
	};
});
