// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
// git ignore testing
namespace DAL.Core
{
    public enum Gender
    {
        None,
        Female,
        Male
    }
    public enum WoStatus
    {
        [Display(Name = "Open")]
        Open = 1,
        [Display(Name = "Work Order Accepted")]
        WoAccepted = 3,
        [Display(Name = "Travel to Site")]
        TravelToSite = 4,
    }
    public enum NotificaitonTypes
    {
        NewUserRegistration = 1,
        UserRoleChange = 2,
        UserPasswordReset = 3,
        Reminder = 4,
        Comments = 5,
        Emails = 6,
        NewQuoteCreated = 11,
        QuoteApprovedByCustomer = 12,
        EstimateDeleted = 14,
        NewWorkorderCreated = 15,
        WorkorderStatusChange = 19,
        WorkorderCompleted = 20,
        WorkorderTrackingMsgToCustomer = 21,
        WorkorderDeleted = 22,
        NewInvoiceCreated = 23,
        InvoiceSentToCustomer = 24,
        PaymentReceivedByCustomer = 25,
        InvoiceRejectedByCustomer = 26,
        InvoiceDeleted = 27,
        NewTransferOrderCreated = 29,
        PurchaseOrderCreated = 30,
        OrderShipped = 32,
        TransferOrderDeleted = 33,
        SalesOrderDeleted = 34,
        TeamMemberAdded = 42

    }
    public enum  StockVoucherType{
        NewItemAdded=1,
        Purchase=2,
        //PurchaseReturn=3,
        Sales=4,
        //SalesReturn=5,
        Transfer=6,
        Discard=7
    }
}
