 define("UsrBindingExample", [], function () {
	testVar=0;
    Ext.define("Terrasoft.configuration.UsrBindingExample", {
        alternateClassName: "Terrasoft.UsrBindingExample",
        extend: "Terrasoft.BaseModule",
        Ext: null,
        sandbox: null,
        Terrasoft: null,
        viewModel: null,
        view: null,
        init: function () {
            this.callParent(arguments);
            this.initViewModel();
        },
		
		
		
		
		
		
		
        initViewModel: function () {
            var self = this;
            this.viewModel = Ext.create("Terrasoft.BaseViewModel", {
                values: {
                    btnCaption: "BUTTON TEXT",
					testVar: 2
                },
                methods: {
                    onBtnClick: function () {
                        var caption = this.get("btnCaption");
						var n = this.get("testVar");
                        //self.destroy();
						testVar=testVar+1;
						window.alert(caption + " button was pressed " + testVar);
                    }
                }
            });
        },
		
		
		
		
		
		
		
        render: function (renderTo) {
			/*
            var btn = Ext.create("Terrasoft.Button", {
                id: "example-btn",
                className: "Terrasoft.Button",
                caption: {
                    bindTo: "btnCaption"
                },
                click: {
                    bindTo: "onBtnClick"
                },
                style: this.Terrasoft.controls.ButtonEnums.style.GREEN
            });
			*/
			var lbl = Ext.create("Terrasoft.Label", {
					id: "example-lbl",
                    caption: "SOME TEXT"
                });
			var lbl1 = Ext.create("Terrasoft.Label", {
					id: "example-lbl2",
                    caption: "SOME TEXT2"
                });
			var btn = Ext.create("Terrasoft.Button", {
					id: "example-btn",
					caption: "BUTTON TEXT",
					className: "Terrasoft.Button",
					click: {
                    bindTo: "onBtnClick"
                	},
					style: this.Terrasoft.controls.ButtonEnums.style.GREEN
								 });
			///////
			this.myView = Ext.create("Terrasoft.Container", {
                    id: "myContainer",
                    items: [lbl1, lbl, btn],
                    renderTo: renderTo
                });
			
			///////
			
            this.view.bind(this.viewModel);
            return this.view;
        },
        destroy: function () {
            this.myView.destroy();
            this.viewModel.destroy();
        }
    });
    return Terrasoft.UsrBindingExample;
});