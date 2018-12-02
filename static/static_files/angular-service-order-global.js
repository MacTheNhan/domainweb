"use strict";
angular.module("orderModuleService", [])
.factory("orderServiceGlobal", orderService);

function orderService() {
    return {
        saveInfoComboToCart: function (pkdetail, domain) {
            var d = new Date();
            var obj = {
                combo: 1,
                serviceType: 2,
                period: 1,
                domainName : "",
                packageName : "",
                hostingType : "",
                fee : 0,
                feeOrigin : 0,
                domPrice: "",
                hostingPrice: "",
                discountPercent: "",
                action : "CREATE"
            };
            obj.serviceType = pkdetail.data.serviceType;
            obj.period = 1;
            obj.hostingType = pkdetail.data.expression;
            obj.packageName = pkdetail.data.name;
            obj.domainName = d.getTime() + ".hosting.inet.vn," + domain.domainName;
            obj.fee = pkdetail.data.price * 12 * pkdetail.discount + domain.fee;
            obj.feeOrigin = pkdetail.data.priceOrigin * 12 + domain.feeOrigin;
            obj.feeReg = 0;
            obj.feeRegOrigin = 0;
            obj.feeRen = pkdetail.data.price * 12 * pkdetail.discount + domain.fee;
            obj.feeRenOrigin = pkdetail.data.priceOrigin * 12 + domain.fee;
            obj.domPrice = domain.fee;
            obj.discountPercent = pkdetail.discount;
            obj.hostingPrice = pkdetail.data.price;
            return obj;
        },
        saveInfoComboDom1kToCart: function (pkdetail, domain) {
            var d = new Date();
            var obj = {
                combo: 1,
                serviceType: 2,
                period: 1,
                domainName : "",
                packageName : "",
                hostingType : "",
                fee : 0,
                feeOrigin : 0,
                domPrice: "",
                dom1k: "",
                hostingPrice: "",
                discountPercent: "",
                action : "CREATE"
            };
            obj.dom1k = 1000;
            obj.serviceType = pkdetail.data.serviceType;
            obj.period = 1;
            obj.hostingType = pkdetail.data.expression;
            obj.packageName = pkdetail.data.name;
            obj.domainName = d.getTime() + ".hosting.inet.vn," + domain.domainName;
            obj.fee = pkdetail.data.price * 12 * pkdetail.discount + obj.dom1k;
            obj.feeOrigin = pkdetail.data.priceOrigin * 12 + domain.feeRenOrigin;
            obj.feeReg = 0;
            obj.feeRegOrigin = 0;
            obj.feeRen = pkdetail.data.price * 12 * pkdetail.discount + obj.dom1k;
            obj.feeRenOrigin = pkdetail.data.priceOrigin * 12 + domain.feeRenOrigin;
            obj.domPrice = domain.fee;
            obj.discountPercent = pkdetail.discount;
            obj.hostingPrice = pkdetail.data.price;
            return obj;
        },
        saveInfoComboDomEmailkToCart: function (pkdetail, domain) {
            var d = new Date();
            var obj = {
                combo: 1,
                serviceType: 2,
                period: 1,
                domainName : "",
                packageName : "",
                emailType : "",
                fee : 0,
                feeOrigin : 0,
                domPrice: "",
                dom1k: "",
                emailPrice: "",
                discountPercent: "",
                action : "CREATE"
            };
            obj.serviceType = pkdetail.data.serviceType;
            obj.period = 1;
            obj.emailType = pkdetail.data.expression;
            obj.packageName = pkdetail.data.name;
            obj.domainName = d.getTime() + ".mailer.inet.vn," + domain.domainName;
            obj.fee = pkdetail.data.price * 12 * pkdetail.discount + domain.fee;
            obj.feeOrigin = pkdetail.data.priceOrigin * 12 + domain.feeOrigin;
            obj.feeReg = 0;
            obj.feeRegOrigin = 0;
            obj.feeRen = pkdetail.data.price * 12 * pkdetail.discount + domain.fee;
            obj.feeRenOrigin = pkdetail.data.priceOrigin * 12 + domain.fee;
            obj.domPrice = domain.fee;
            obj.discountPercent = pkdetail.discount;
            obj.emailPrice = pkdetail.data.price;
            return obj;
        }
    }
};