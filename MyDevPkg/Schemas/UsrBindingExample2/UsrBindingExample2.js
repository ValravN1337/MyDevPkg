 define("UsrBindingExample2", [],
    function () {
        return {
			
			init: function () {
            this.callParent(arguments);
            this.initViewModel();
        },
			
			
			
			initViewModel: function () {
            var self = this;
            this.viewModel = Ext.create("Terrasoft.BaseViewModel", {
                values: {
                    btnCaption: "Click Me"
                },
                methods: {
                    onBtnClick: function () {
                        var caption = this.get("btnCaption");
                        window.alert(" button was pressed");
                    }
                }
            });
        },
			
			
			
			
            render: function (renderTo) {
                var lbl = Ext.create("Terrasoft.Label", {
                    caption: "CAPTIONTEXT"
                });
				var btn = Ext.create("Terrasoft.Button", {
					id: "example-btn",
					className: "Terrasoft.Button",
					caption: "TEXT",
					click: {
						bindTo: "onBtnClick"
					},
					style: this.Terrasoft.controls.ButtonEnums.style.GREEN
				});
                this.view = Ext.create("Terrasoft.Container", {
                    id: "myContainer",
                    items: [lbl,btn],
                    renderTo: renderTo
                });
				this.view.bind(this.viewModel);
           		return this.view;
				
				
				
				
				
				
				
				
            },
			
			
			
            destroy: function () {
                this.view.destroy();
            }
        };
    });