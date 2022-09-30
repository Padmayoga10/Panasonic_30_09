// import { Component, OnInit} from '@angular/core';
// import { MarketUpdateService } from '@services/market-update.service'
// import { ToasterService } from '@services/toaster.service';
// import { DatePipe } from '@angular/common'
// import { FormGroup, FormControl } from '@angular/forms';
// import { DateRangeService } from '@services/date-range.service';
// var moment = require('moment');

// import { DaterangepickerComponent } from 'ng2-daterangepicker';
// import { UtilityService } from '@services/utility.service';
// @Component({
//   selector: 'app-feedback',
//   templateUrl: './feedback.component.html',
//   styleUrls: ['./feedback.component.css']
// })
// export class FeedbackComponent implements OnInit {

//   page: number = 1;
//   itemsPerPage: number = 8;
//   totalCount: number;
//   searchFromDate: any;
//   searchToDate: any;
  
//   feedbackList: any;
//   searchDatas: any;
  
//   arnList: any = [];
//   fileList: any = [];

//   attachments: any;
//   totalRecords: any;
//   initValues = {
//     title: 'Market Updates',
//     formDetails: [
//       {
//         label: 'ARN Number',
//         controlName: 'arn_number',
//         type: 'select',
//         list:this.arnList
//       },
//       {
//         label: 'Market Updates',
//         controlName: 'folderName',
//         type: 'select',
//         list:[
//           {
//              "key" : "Aaj_Ka_Bazar",
//              "value" : "Aaj Ka Bazar"
//           },
//           {
//              "key" : "Fund_Manager_Videos",
//              "value" : "Fund Manager Videos"
//           },
//           {
//              "key" : "Weekly_Snapshot",
//              "value" : "Weekly Snapshot"
//           },
//           {
//              "key" : "Weekly_Debt_Market",
//              "value" : "Weekly Debt Market"
//           },
//           {
//              "key" : "Monthly_Snapshot",
//              "value" : "Monthly Snapshot"
//           },
//           {
//              "key" : "Monthy_Samvaad",
//              "value" : "Monthy Samvaad"
//           }
//        ]
//       },
//       {
//         label: 'File Name',
//         controlName: 'url',
//         type: 'select',
//         list:this.fileList
//       },
   
//     ],
//     header: ['SNo', "Date and Time","Mobile Number","Profile Name","ARN Number","Market Updates","File Name"], 
//   }

//   customListDatas = {};
//   feedbackValue: boolean;
//   greatCount: any;
//   goodCount: any;
//   okCount: any;
//   badCount: any;

//   constructor(
//     private enterpriseService: MarketUpdateService,
//     private toasterService: ToasterService,
//     private dateService: DateRangeService,
//     private utilityService: UtilityService
//   ) {}


//   ngOnInit(): void {
//     var payload = {ProcessVariables:{} }
//     this.getFeedBackList()
//     this.enterpriseService.arnlist(payload).subscribe(res=>{
//       this.arnList= res.ProcessVariables.output_data;
//       this.initValues.formDetails[0].list=this.arnList;
//     }) 
//     this.enterpriseService.filelist(payload).subscribe(res=>{
//       this.fileList= res.ProcessVariables.output_data;
//       this.initValues.formDetails[2].list=this.fileList;
//     }) 
//   }

//   async getFeedBackList(searchData?) {
//     const params = {
//       current_page: this.page || 1,
//       per_page: this.itemsPerPage || 10,
//       // isApplyFilter: false,
//       isCSVDownload: true,
//       ...searchData
//     }

//     console.log('params', params);
//     var payload = {ProcessVariables:params}
//     this.enterpriseService.marketList(payload).subscribe(visitors => {
//       console.log('Visitors', visitors)

//       const appiyoError = visitors?.Error;
//     const apiErrorCode = visitors.ProcessVariables?.errorCode;
//     const errorMessage = visitors.ProcessVariables?.errorMessage;

//     if (appiyoError == '0') {
//       const processVariables = visitors['ProcessVariables']
//       this.itemsPerPage = processVariables['per_page'];
//       let totalPages = processVariables['total_pages'];
//       this.totalCount = Number(this.itemsPerPage) * Number(totalPages);
//       // this.corporateCount = Number(this.itemsPerPage) * Number(totalPages);
//       // this.corporateCount = 80000;
//       this.totalRecords = processVariables?.totalCount;
//       this.feedbackList = processVariables.output_data;

//       for(var i=0; i<processVariables.output_data?.length; i++) {
//         this.feedbackList[i].SNo=(this.itemsPerPage * (processVariables['current_page']-1)) + i+1;
//         this.feedbackList[i].created_at=this.feedbackList[i].created_at.split(' ').join(' and ');
//       }
     
//       this.customListDatas = {
//         itemsPerPage: this.itemsPerPage,
//         perPage: this.page,
//         totalCount: this.totalCount,
//         // corporateCount: this.corporateCount,
//         totalRecords: this.totalRecords,
//         marketUpdateCount : processVariables['totalMarketUpdatsUserCount'], //api needed
//         data: this.feedbackList,
//         appointment : true,
//         keys: ['SNo', "created_at",'mobile_number','profile_name','arn_number','folder_name',"url"],
//       }

//     } else {
//       this.toasterService.showError(visitors['ProcessVariables']?.errorMessage == undefined ? 'Appointment list error' : visitors['ProcessVariables']?.errorMessage, 'Visitors')
//     }
//     })
   
//   }

//   async onDownloadCsv(event) {
//     var params;
    
//       params = {

//         // isApplyFilter: false,
//         isCSVDownload: true,
//         ...event
//       }
     

//     console.log('params', params);
//     var payload = {ProcessVariables:params}
//     this.enterpriseService.marketCSV(payload).subscribe(visitors => {
//       console.log('Visitors', visitors)

//     const appiyoError = visitors?.Error;
//     const apiErrorCode = visitors.ProcessVariables?.errorCode;
//     const errorMessage = visitors.ProcessVariables?.errorMessage;

//     if (appiyoError == '0') {

//       const processVariables = visitors['ProcessVariables']

//       this.attachments = processVariables?.attachment;
//       this.utilityService.onDownloadCsv(this.attachments);


//     } else {
//       this.toasterService.showError(visitors['ProcessVariables']?.errorMessage == undefined ? 'Download error' : visitors['ProcessVariables']?.errorMessage, 'Visitors')
//     }
//     })

   
//   }


//   async pageChangeEvent(event) {
//     this.page = event.pageIndex;
//     this.searchDatas = event.searchDatas
//     this.getFeedBackList(this.searchDatas)
//   }



//   applyAndClear(event) {
//     this.page = event.pageIndex;
//     this.searchDatas = event.searchDatas
//    this.getFeedBackList(this.searchDatas)
   
//   }




// }


// copied from panasonic sample

import { Component, OnInit} from '@angular/core';
import { MarketUpdateService } from '@services/market-update.service'
import { ToasterService } from '@services/toaster.service';
import { DatePipe } from '@angular/common'
import { FormGroup, FormControl } from '@angular/forms';
import { DateRangeService } from '@services/date-range.service';
var moment = require('moment');

import { DaterangepickerComponent } from 'ng2-daterangepicker';
import { UtilityService } from '@services/utility.service';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  page: number = 1;
  itemsPerPage: number = 8;
  totalCount: number;
  searchFromDate: any;
  searchToDate: any;
  
  feedbackList: any;
  searchDatas: any;
  
  attachments: any;
  totalRecords: any;
  totalService:any;
  initValues = {
    title: 'Service Report',
    formDetails: [
      {
        label: 'Service',
        controlName: 'Service',
        type: 'select',
        list:[
          {
            key: 'Products & offer',
            value: 'Products & offer'
          },
          {
            key: 'After Sales',
            value: 'After Sales'
          },
          {
            key: 'Online Chef Classess',
            value: 'Online Chef Classes'
          }
        ]
      },
      {
        label: 'Language',
        controlName: 'language',
        type: 'select',
        list:[
          {
            key: 'English',
            value: 'English'
          },
          {
            key: 'Hindi',
            value: 'Hindi'
          },
          
        ]
      },
      
    ],
    header: ['SNo', "Date","Mobile Number","Language","Service"], 
  }

  customListDatas = {};
  feedbackValue: boolean;
  greatCount: any;
  goodCount: any;
  okCount: any;
  badCount: any;

  constructor(
    private enterpriseService: MarketUpdateService,
    private toasterService: ToasterService,
    private dateService: DateRangeService,
    private utilityService: UtilityService
  ) {}


  ngOnInit(): void {

    this.getFeedBackList()
  }

  async getFeedBackList(searchData?) {
    const params = {
      current_page: this.page || 1,
      per_page: this.itemsPerPage || 10,
      // isApplyFilter: false,
      isCSVDownload: true,
      ...searchData
    }

    console.log('params', params);
    let visitors = {
      "ApplicationId" : "62e263265c57c82568ad2c7b",
      "Error" : "0",
      "ErrorCode" : "",
      "ErrorMessage" : "",
      "ProcessId" : "3d9bac643e1611ed8ae00242ac110002",
      "ProcessInstanceId" : "a68f2bde3fc311edaf870242ac110002",
      "ProcessName" : "Product Notes Pagination",
      "ProcessVariables" : {
         "arn_number" : "",
         "count" : 1,
         "current_page" : 1,
         "folderName" : "",
         "from" : 0,
         "from_date" : "",
         "output_data" : [
            {
               "arn_number" : "sk123",
               "created_at" : "2022-09-22 17:34",
               "folder_name" : "Product_Notes",
               "id" : "9",
               "mobile_number" : "+9121035",
               "profile_name" : "-",
               "subfolder" : "Equity",
               "url" : "http://appiyo.karix.solutions/mahindra/Product_Info/Product_Notes/Equity/Product_Note_MMMF_Kar_Bachat_June_2022.pdf"
            }
         ],
         "output_data1" : [
            {
               "count" : "1",
               "folder_name" : "Product_Notes"
            }
         ],
         "output_data2" : [
            {
               "count" : "1",
               "folder_name" : "Equity"
            }
         ],
         "per_page" : 8,
         "query" : "select count(*) as count from dashboard_reports where is_active='1' and usecase ='Product_Info'            and folder_name in ('Product_Notes')",
         "query2" : "SELECT folder_name as folder_name, COUNT(*) as folder_count FROM dashboard_reports where is_active='1' and usecase='Product_Info' and folder_name in('Product_Notes') group by folder_name order by folder_name",
         "query3" : "SELECT subfolder as folder_name, COUNT(*) as folder_count FROM dashboard_reports where is_active='1' and usecase='Product_Info' and folder_name in('Product_Notes') and subfolder in('Hybrid','Debt','Equity') GROUP BY subfolder order by subfolder",
         "query_1" : "select id,mobile_number,arn_number,profile_name,usecase,               folder_name,subfolder,url,               DATE_FORMAT(created_at, '%Y-%m-%d %H:%i')as created_at from dashboard_reports where is_active='1' and usecase ='Product_Info'               and folder_name in ('Product_Notes')  order by id desc limit 0,8",
         "subFolder" : "",
         "to_date" : "",
         "totalCount" : "107",
         "totalProductInfoCount" : "11",
         "total_pages" : 1,
         "url" : ""
      },
      "Status" : "Execution Completed",
      "WorkflowId" : "3d8ef3ac3e1611edbf2e0242ac110002",
      "currentCorrelationId" : "281475481170920",
      "customizedLogId" : "",
      "endedOn" : "2022-09-29T06:55:06.482030",
      "isWaitingForEvent" : false,
      "nodeBPMNId" : "7",
      "processId" : "3d9bac643e1611ed8ae00242ac110002",
      "processName" : "Product Notes Pagination",
      "repoId" : "62e263265c57c82568ad2c7b",
      "repoName" : "Mahindra",
      "rootCorrelationId" : "281475481170920",
      "startedOn" : "2022-09-29T06:55:06.393103"
   }
    // this.enterpriseService.marketList(params).subscribe(visitors => {
      console.log('Visitors', visitors)

      const appiyoError = visitors?.Error;
    const apiErrorCode = visitors.ProcessVariables['errorCode'];
    const errorMessage = visitors.ProcessVariables['errorMessage'];

    if (appiyoError == '0') {
      const processVariables = visitors['ProcessVariables']
      this.itemsPerPage = processVariables['per_page'];
      let totalPages = processVariables['total_pages'];
      this.totalCount = Number(this.itemsPerPage) * Number(totalPages);
      // this.corporateCount = Number(this.itemsPerPage) * Number(totalPages);
      // this.corporateCount = 80000;
      this.totalRecords = 8;
      // this.totalRecords = processVariables?.count;
      // this.feedbackList = processVariables.output_data;
      this.feedbackList = [
        
        {
          "SNo": "1",
                "arn_number" : "arn-909090",
                "created_at" : "2022-09-15 11:47:28",
                "digital_factsheet" : "-",
                "id" : "913",
                "file_download":"YES/NO",
                "latest_product_info" : "Product_Deck | One_Pagers",
                "market_updates" : "-",
                "marketing_material" : "Product_Info | Product_Info",
                "mobile_number" : "+918055191660",
                "one_pager" : "Equity",
                "product_notes" : "-",
                "profile_name" : "lalit maharshi",
                "corporate_deck_file_name": "pdf",
                "updated_at" : "2022-09-15T11:54:55Z",
                "product_info":"prod_notes",
                "branch": "Equity",
                "Corporate Deck_File": "MMMF_Flexi_cap_July_2022.pdf",
                "product_type":"ELSS Kar Bachat Yojana - PDF",
                "consent_name":"Yes/No",
                "service":"products and offer",
                "language":"English",
                "url" : "MMMF_Product_Deck_July_2022.pdf | One_pager_MMMF_Flexi_cap_July_2022.pdf"
             },
             {
          "SNo": "2",
                "arn_number" : "arn-1235465767653423",
                "created_at" : "2022-09-15 11:23:23",
                "digital_factsheet" : "-",
                "id" : "912",
                "latest_product_info" : "-",
                "market_updates" : "-",
                "marketing_material" : "-",
                "mobile_number" : "+919025347318",
                "one_pager" : "-",
                "product_notes" : "-",
                "profile_name" : "-",
                "corporate_deck_file_name": "pdf",
                "updated_at" : "2022-09-15T11:32:57Z",
                "product_info":"prod_notes",
                "branch": "Equity",
                "Corporate Deck_File": "MMMF_Product_July_2022.pdf",
                "product_type":"Mid Cap Unnati Yojana-PDF",
                "file_download":"YES/NO",
                "consent_name":"Yes/No",
                "url" : "-",
                
                "service":"products and offer",
                "language":"English"
             },
             {
          "SNo": "3",
                "arn_number" : "-",
                "created_at" : "2022-09-14 16:27:55",
                "digital_factsheet" : "-",
                "id" : "911",
                "latest_product_info" : "-",
                "market_updates" : "-",
                "marketing_material" : "-",
                "mobile_number" : "+918226096969",
                "one_pager" : "-",
                "product_notes" : "-",
                "profile_name" : "-",
                "corporate_deck_file_name": "pdf",
                "updated_at" : "2022-09-14T16:27:55Z",
                "product_info":"prod_notes",
                "branch": "Equity",
                "file_download":"YES/NO",
                "Corporate Deck_File": "MMMF_Flexi_cap_July_2022.pdf",
                "product_type":"Large Cap Pragati Yojana-PDF",
                "url" : "-",
                "consent_name":"Yes/No",
                "service":"products and offer",
                "language":"English"
                
             },
             {
          "SNo": "4",
                "arn_number" : "151515",
                "created_at" : "2022-09-13 14:24:02",
                "digital_factsheet" : "-",
                "id" : "910",
                "latest_product_info" : "One_Pagers",
                "market_updates" : "-",
                "marketing_material" : "Product_Info",
                "mobile_number" : "+919836233352",
                "one_pager" : "Equity",
                "product_notes" : "-",
                "profile_name" : "Amit Teckchandani",
                "corporate_deck_file_name": "pdf",
                "updated_at" : "2022-09-13T14:25:27Z",
                "product_info":"prod_notes",
                "branch": "Hybrid",
                "product_type":"Equity Savings Yojana",
                "Corporate Deck_File": "MMMF_Product_July_2022.pdf",
                "file_download":"YES/NO",
                "url" : "One_Pager_MMMF_Kar_Bachat__Yojana_July_2022.pdf",
                "service":"products and offer",
                "language":"English",
                "consent_name":"Yes/No",
             },
             {
          "SNo": "5",
                "arn_number" : "151515",
                "created_at" : "2022-09-13 14:06:40",
                "digital_factsheet" : "-",
                "id" : "909",
                "latest_product_info" : "One_Pagers",
                "market_updates" : "-",
                "marketing_material" : "Product_Info",
                "mobile_number" : "+919836233352",
                "one_pager" : "Equity",
                "product_notes" : "-",
                "profile_name" : "Amit Teckchandani",
                "corporate_deck_file_name": "pdf",
                "updated_at" : "2022-09-13T14:07:42Z",
                "product_info":"prod_notes",
                "branch": "Hybrid",
                "product_type":"Equity Nivesh Yojana",
                "Corporate Deck_File": "MMMF_Product_July_2022.pdf",
                "file_download":"YES/NO",
                "service":"products and offer",
                "language":"English",
                "consent_name":"Yes/No",
                "url" : "One_pager_MMMF_Unnati_Yojana_July_2022.pdf | One_pager_MMMF_Flexi_cap_July_2022.pdf"
             },
             {
          "SNo": "6",
                "arn_number" : "-",
                "created_at" : "2022-09-13 13:48:58",
                "digital_factsheet" : "-",
                "id" : "908",
                "latest_product_info" : "-",
                "market_updates" : "-",
                "marketing_material" : "-",
                "mobile_number" : "+919836233352",
                "one_pager" : "-",
                "product_notes" : "-",
                "profile_name" : "-",
                "corporate_deck_file_name": "pdf",
                "updated_at" : "2022-09-13 13:48:58",
                "product_info":"prod_notes",
                "branch": "Hybrid",
                "file_download":"YES/NO",
                "Corporate Deck_File": "MMMF_Product_July_2022.pdf",
                "product_type":"Equity Nivesh Yojana",
                "url" : "-",
                "service":"products and offer",
                "language":"English",
                "consent_name":"Yes/No",
             },
         {
          "SNo": "7",
                "arn_number" : "39164",
                "created_at" : "2022-09-15 17:01:15",
                "digital_factsheet" : "-",
                "id" : "914",
                "latest_product_info" : "-",
                "market_updates" : "-",
                "marketing_material" : "-",
                "mobile_number" : "+919768053120",
                "one_pager" : "-",
                "product_notes" : "-",
                "profile_name" : "-",
                "corporate_deck_file_name": "pdf",
                "updated_at" : "2022-09-15T17:02:52Z",
                "product_info":"prod_notes",
                "branch": "Equity",
                "file_download":"YES/NO",
                "Corporate Deck_File": "MMMF_Flexi_cap_July_2022.pdf",
                "product_type":"ELSS Kar Bachat Yojana - PDF",
                "url" : "-",
                "service":"products and offer",
                "language":"English",
                "consent_name":"Yes/No",
             },
         {
          "SNo": "8",
                "arn_number" : "arn-123456",
                "created_at" : "2022-09-16 10:22:24",
                "digital_factsheet" : "-",
                "id" : "916",
                "latest_product_info" : "-",
                "market_updates" : "-",
                "marketing_material" : "-",
                "mobile_number" : "+919833667644",
                "one_pager" : "-",
                "product_notes" : "-",
                "profile_name" : "-",
                "corporate_deck_file_name": "pdf",
                "updated_at" : "2022-09-16T10:23:15Z",
                "product_info":"Prod_notes",
                "product_type":"Equity Savings Yojana",
                "Corporate Deck_File": "MMMF_Flexi_cap_July_2022.pdf",
                "branch": "Hybrid",
                "file_download":"YES/NO",
                "url" : "-",
                "service":"products and offer",
                "language":"English",
                "consent_name":"Yes/No",
             }
      ];

      // for(var i=0; i<processVariables?.output_data?.length; i++) {
       
      //   this.feedbackList[i].SNo=i+1;
      //   this.feedbackList[i].file_download='Yes';
      // }
     
      this.customListDatas = {
        itemsPerPage: this.itemsPerPage,
        perPage: this.page,
        totalCount: this.totalCount,
        // corporateCount: this.corporateCount,
        totalService: 5,
        totalRecords: this.totalRecords,
        data: this.feedbackList,

        appointment : true,
        keys: ['SNo', "created_at",'mobile_number','language','service'],
      }

    } else {
      this.toasterService.showError(visitors['ProcessVariables']['errorMessage'] == undefined ? 'Appointment list error' : visitors['ProcessVariables']['errorMessage'], 'Visitors')
    }
    // })
   
  }

  async onDownloadCsv(event) {
    var params;
    if (!event.fromDate && !event.toDate) {
      params = {
        fromDate: moment().format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),
        // isApplyFilter: false,
        isCSVDownload: true,
        ...event
      }
    }
    else {
      params = {

        // isApplyFilter: false,
        isCSVDownload: true,
        ...event
      }
     
    }

    console.log('params', params);

    this.enterpriseService.marketCSV(params).subscribe(visitors => {
      console.log('Visitors', visitors)

    const appiyoError = visitors?.Error;
    const apiErrorCode = visitors.ProcessVariables?.errorCode;
    const errorMessage = visitors.ProcessVariables?.errorMessage;

    if (appiyoError == '0') {

      const processVariables = visitors['ProcessVariables']

      this.attachments = processVariables?.attachment;
      this.utilityService.onDownloadCsv(this.attachments);


    } else {
      this.toasterService.showError(visitors['ProcessVariables']?.errorMessage == undefined ? 'Download error' : visitors['ProcessVariables']?.errorMessage, 'Visitors')
    }
    })

   
  }


  async pageChangeEvent(event) {
    this.page = event.pageIndex;
    this.searchDatas = event.searchDatas
    this.getFeedBackList(this.searchDatas)
  }



  applyAndClear(event) {
    this.page = event.pageIndex;
    this.searchDatas = event.searchDatas
   this.getFeedBackList(this.searchDatas)
   
  }




}
