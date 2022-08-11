 define("UsrBindingExample1", [], function () {
	var counter=0;
    Ext.define("Terrasoft.configuration.UsrBindingExample1", {
        alternateClassName: "Terrasoft.UsrBindingExample1",
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
                    btnCaption: "Click Me"
                },
                methods: {
                    onBtnClick: function () {
						counter=counter+1;
                        var caption = this.get("btnCaption");
                        //window.alert(caption + " button was pressed");
                        //self.destroy();
						this.set("btnCaption",counter);
                    }
                }
            });
        },
        render: function (renderTo) {
            this.view = this.Ext.create("Terrasoft.Button", {
                renderTo: renderTo,
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
			
			/*
			
			this.view = this.Ext.create("Terrasoft.Label", {
					renderTo: renderTo,
                    caption: "CAPTIONTEXT"
                });
			
			*/
			
            this.view.bind(this.viewModel);
            return this.view;
        },
        destroy: function () {
            this.view.destroy();
            this.viewModel.destroy();
        }
    });
    return Terrasoft.UsrBindingExample1;
});