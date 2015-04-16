$(function () {
    $("#companies").jqGrid({
        url: 'api/Companies',
        datatype: "json",
        search: true,
        colNames: ['id', 'Name', 'Address'],
        colModel: [
            {
                name: 'Id',
                index: 'Id',
                hidden: true,
                key: true
            },
            {
                name: 'Name',
                index: 'Name',
                width: 200,
                searchoptions: {
                    sopt: ['cn']
                }
            },
            {
                name: 'Address',
                index: 'Address',
                width: 300,
                searchoptions: {
                    sopt: ['cn']
                }
            }
        ],
        rowNum: 2,
        rowList: [2, 4, 8],
        pager: '#companiesPager',
        sortname: 'Name',
        viewrecords: true,
        sortorder: "desc",
        caption: "Companies",
    });


    jQuery("#companies")
        .jqGrid('navGrid', '#companiesPager')
        .jqGrid('filterToolbar', {
            stringResult: true,
            searchOnEnter: true,
            defaultSearch: 'ge'
        });

    $("#employees").jqGrid({
        url: 'api/Employees',
        datatype: 'json',
        jsonReader: {
            root: "records",
            page: "pageNumber",
            total: "totalPages",
            records: "totalRows",
            repeatitems: false,
            cell: "",
            id: "id",
            userdata: "total"
        },
        search: true,
        colNames: ['id', 'Name', 'Start Date', 'End Date', 'Company'],
        colModel: [
            {
                name: 'ID',
                index: 'Id',
                hidden: true,
                key: true
            },
            {
                name: 'Name',
                index: 'Name',
                width: 200,
                searchoptions: {
                    sopt: ['cn']
                }
            },
            {
                name: 'StartDate',
                index: 'Start Date',
                width: 300,
                searchoptions: {
                    sopt: ['cn']
                }
            },
            {
                name: 'EndDate',
                index: 'End Date',
                width: 300,
                searchoptions: {
                    sopt: ['cn']
                }
            },
            {
                name: 'Company',
                index: 'Company.Name', // sorting field
                filterName: 'CompanyID', // filtering field
                label: 'Company',
                width: 300,
                firstsortorder: 'asc',
                stype: 'select',
                searchoptions: {
                    sopt: ['eq'],
                    dataUrl: 'api/Companies/GetCompaniesList',
                    buildSelect: function (data) {
                        var selectOptionHtml = '<select><option selected="selected" value="">&lt;All&gt;</option>';
                        data = JSON.parse(data);
                        $.each(data, function (index, element) {
                            selectOptionHtml += '<option value="' + element.ID + '"> ' + $.jgrid.htmlEncode(element.Name) + ' </option>';
                        });
                        return selectOptionHtml + '</select>';
                    }
                }
            }
        ],
        rowNum: 2,
        rowList: [2, 4, 8],
        pager: '#employeesPager',
        sortname: 'Name',
        viewrecords: true,
        sortorder: "asc",
        caption: "Employees",
    });


    jQuery("#employees")
        .jqGrid('navGrid', '#employeesPager')
        .jqGrid('filterToolbar', {
            stringResult: true,
            searchOnEnter: true,
            defaultSearch: 'ge'
        });
})
