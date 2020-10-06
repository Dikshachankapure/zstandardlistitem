sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/m/MessageBox"
], function (Controller, JSONModel, History, MessageBox) {
	"use strict";

	return Controller.extend("standardlistitems.z_StandardList.controller.View2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf standardlistitems.z_StandardList.view.View2
		 */
		onInit: function () {

			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("View2").attachPatternMatched(this.onEditMatched, this);
			var oModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModel);
		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		Gotopage1: function () {
			this.getRouter().navTo("View1", {}, true);
		},

		onEditMatched: function (oEvent) {
			var oParameters = oEvent.getParameters(); // get parameter 
			var URL = "/V2/Northwind/Northwind.svc/V2/Northwind/Northwind.svc/";
			var oDataModel = new sap.ui.model.odata.ODataModel(URL, true);

			var custid = this.getView().byId("custId");
			var NCName = this.getView().byId("Cname");
			var NcontactNm = this.getView().byId("ContactName");
			var NcontactTl = this.getView().byId("CTitle");
			var Naddr = this.getView().byId("aadr");
			var Ncity = this.getView().byId("City1");
			var NRgn = this.getView().byId("rg1");
			var NpostCd = this.getView().byId("postcd");
			var NCountry = this.getView().byId("country");
			var Nphone = this.getView().byId("ph1");
			var Nfax = this.getView().byId("fax1");

			var filters = [];
			var custId = oParameters.arguments.CustomerID;
			var custIdFilter = new sap.ui.model.Filter("CustomerID", "EQ", custId);
			filters.push(custIdFilter);

			oDataModel.read("/Customers", {
				filters: filters,
				success: function (odata) {
					if (odata.results.length > 0) {
						custid.setValue(odata.results[0].CustomerID);
						NCName.setValue(odata.results[0].CompanyName);
						NcontactNm.setValue(odata.results[0].ContactName);
						NcontactTl.setValue(odata.results[0].ContactTitle);
						Naddr.setValue(odata.results[0].Address);
						Ncity.setValue(odata.results[0].City);
						NRgn.setValue(odata.results[0].Region);
						NpostCd.setValue(odata.results[0].PostalCode);
						NCountry.setSelectedKey(odata.results[0].Country);
						Nphone.setValue(odata.results[0].Phone);
						Nfax.setValue(odata.results[0].Fax);
					}
				},
				error: function (oError) {
					MessageBox.error(oError);
				}
			});
		},

		onCreate: function () {
			/*create operation*/
		//	var oModel = this.getView().getModel();
				var URL = "/V2/Northwind/Northwind.svc/V2/Northwind/Northwind.svc/";
			var oDataModel = new sap.ui.model.odata.ODataModel(URL, true);

			var data = {};

			data.custid = this.getView().byId("custId").getValue();
			data.NCName = this.getView().byId("Cname").getValue();
			data.NcontactNm = this.getView().byId("ContactName").getValue();
			data.NcontactTl = this.getView().byId("CTitle").getValue();
			data.Naddr = this.getView().byId("aadr").getValue();
			data.Ncity = this.getView().byId("City1").getValue();
			data.NRgn = this.getView().byId("rg1").getValue();
			data.NpostCd = this.getView().byId("postcd").getValue();
			data.NCountry = this.getView().byId("country").getSelectedKey();
			data.Nphone = this.getView().byId("ph1").getValue();
			data.Nfax = this.getView().byId("fax1").getValue();

			oDataModel.create("/Customers", data, {
				
				success: function (odata) {
				
 		        	sap.m.MessageToast.show("Data Created");
				},
				error: function (oError) {
					sap.m.MessageToast.show("Data Not Created");
				}
			});
		}

		
	});
});