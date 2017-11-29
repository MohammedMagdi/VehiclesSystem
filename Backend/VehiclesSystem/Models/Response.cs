using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VehiclesSystem.Models
{
    public class Response
    {
        public string Msg { get; set; }
        public int UserId { get; set; }
        public int VehicleId { get; set; }
        public List<User> Users { get; set; }
        public List<Vehicle> Vehicles { get; set; }
    }

    public class User
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public byte Age { get; set; }
        public string MobileNumber { get; set; }
    }
    public class Vehicle
    {
        public int VehicleId { get; set; }
        public int PlateNumber { get; set; }
        public string PlateText { get; set; }
        public string PlateModel { get; set; }
        public string PlateColor { get; set; }
        public bool WaitingForApprove { get; set; }
    }

}