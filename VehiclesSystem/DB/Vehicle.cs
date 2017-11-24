//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace VehiclesSystem.DB
{
    using System;
    using System.Collections.Generic;
    
    public partial class Vehicle
    {
        public int Id { get; set; }
        public int PlateNumber { get; set; }
        public Nullable<int> PlateTextId { get; set; }
        public string PlateModel { get; set; }
        public string PlateColor { get; set; }
        public int UserId { get; set; }
        public bool WaitingForApprove { get; set; }
    
        public virtual PlateText PlateText { get; set; }
        public virtual User User { get; set; }
    }
}
