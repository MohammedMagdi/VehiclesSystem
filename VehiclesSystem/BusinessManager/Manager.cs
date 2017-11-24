﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using VehiclesSystem.DB;
using VehiclesSystem.Models;

namespace VehiclesSystem.BusinessManager
{
    public class Manager
    {
        #region Create new user
        public Response CreateUser(string firstName, string lastName, string email, byte age, string mobileNumber)
        {
            Response response = new Response();
            if (firstName == "" || firstName == null)
            {
                response.Msg = "fail, first name required";
            }
            if (lastName == "" || lastName == null)
            {
                response.Msg = "fail, last name required";
            }
            if (email == "" || email == null)
            {
                response.Msg = "fail, email required";
            }
            int? AGE = age;
            if (!AGE.HasValue)
            {
                response.Msg = "fail, aged required";
            }
            if (mobileNumber == "" || mobileNumber == null)
            {
                response.Msg = "fail, mobile number required";
            }
            else
            {
                if (!IsEmailExist(email))
                {
                    using (VehiclesSystemEntities db = new VehiclesSystemEntities())
                    {
                        DB.User user = new DB.User
                        {
                            FirstName = firstName,
                            LastName = lastName,
                            Email = email,
                            Age = age,
                            MobileNumber = mobileNumber
                        };
                        db.Users.Add(user);
                        db.SaveChanges();
                        int id = user.Id;
                        response.UserId = id;
                        response.Msg = "success";
                    }
                }
                else
                {
                    response.Msg = "failed!, Email is exist";
                }
                
            }
            return response;

        }

        private bool IsEmailExist(string email)
        {
            using (VehiclesSystemEntities db = new VehiclesSystemEntities())
            {
                var result = (from u in db.Users
                              where u.Email == email
                              select u).FirstOrDefault();
                if (result != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
        #endregion

        #region Create New Vehicle
        public Response AddNewVehicle(int plateNumber, string plateText, string plateModel, string plateColor, int userId)
        {
            Response response = new Response();

            int? PLATENUMBER = plateNumber;
            if (!PLATENUMBER.HasValue)
            {
                response.Msg = "fail, plateNumber required";
            }
            if (plateModel == "" || plateModel == null)
            {
                response.Msg = "fail, plateModel required";
            }
            if (plateColor == "" || plateColor == null)
            {
                response.Msg = "fail, plateColor required";
            }
            int? USERID = userId;
            if (!USERID.HasValue)
            {
                response.Msg = "fail, userId null";
            }
            else
            {
                int plateTextId = 0;
                if (plateText != "" && plateText != null)
                {
                    using (VehiclesSystemEntities db = new VehiclesSystemEntities())
                    {
                        DB.PlateText plate = new DB.PlateText
                        {
                            Text = plateText
                        };
                        db.PlateTexts.Add(plate);
                        db.SaveChanges();
                        plateTextId = plate.Id;
                    }
                }
                using (VehiclesSystemEntities db = new VehiclesSystemEntities())
                {
                    DB.Vehicle vehicle = new DB.Vehicle
                    {
                        PlateNumber = plateNumber,
                        PlateColor = plateColor,
                        PlateModel = plateModel,
                        UserId = userId,
                        WaitingForApprove = true
                    };
                    if (plateTextId != 0)
                    {
                        vehicle.PlateTextId = plateTextId;
                    }
                    db.Vehicles.Add(vehicle);
                    db.SaveChanges();
                    response.Msg = "success";

                    var UserInfo = (from u in db.Users
                                    where u.Id == userId
                                    select u).FirstOrDefault();

                    SendEmail(plateNumber, plateText, plateColor, plateModel, UserInfo.FirstName,UserInfo.LastName,UserInfo.MobileNumber, UserInfo.Email, UserInfo.Age);
                }
            }
            return response;

        }

        private void SendEmail(int plateNumber, string plateText, string plateColor, string plateModel, string firstName, string lastName, string mobileNumber, string email, byte age)
        {
            string mailBodyhtml =
            "<p>from user: "+firstName + " " + lastName +" Email: "+email+ "</p>";
            mailBodyhtml += "<p> vehicle info: Plate number: "+plateNumber+" Plate Text: "+plateText+" Plate Color: " + plateColor + " Plate Model: " + plateModel+"</p>";
            var msg = new MailMessage("mohammed.magdi.test@gmail.com", "m.hassan@ntgclarity.com", "New Vehicle was added", mailBodyhtml);
            msg.To.Add("dev.mmagdi@gmail.com");
            msg.IsBodyHtml = true;
            var smtpClient = new SmtpClient("smtp.gmail.com", 587); 
            smtpClient.UseDefaultCredentials = true;
            smtpClient.Credentials = new NetworkCredential("mohammed.magdi.test@gmail.com", "test123456789");
            smtpClient.EnableSsl = true;
            smtpClient.Send(msg);
            Console.WriteLine("Email Sended Successfully");
        }

        #endregion

        #region get all users
        public Response GetUsers()
        {
            Response response = new Response();
            using (VehiclesSystemEntities db = new VehiclesSystemEntities())
            {
                foreach (var item in db.Users)
                {
                    Models.User user = new Models.User
                    {
                        FirstName = item.FirstName,
                        LastName = item.LastName,
                        Age = item.Age,
                        Email = item.Email,
                        MobileNumber = item.MobileNumber
                    };
                    response.Users.Add(user);
                }
                response.Msg = "success";
            }
            return response;
        }
        #endregion

        #region get all new Vehicles
        public Response GetNewVehicles()
        {
            Response response = new Response();
            using (VehiclesSystemEntities db = new VehiclesSystemEntities())
            {
                foreach (var item in db.Vehicles)
                {
                    if (item.WaitingForApprove)
                    {
                        Models.Vehicle vehicle = new Models.Vehicle
                        {
                            VehicleId = item.Id,
                            PlateNumber = item.PlateNumber,
                            PlateModel = item.PlateModel,
                            PlateColor = item.PlateColor
                        };
                        if (item.PlateTextId != null)
                        {
                            vehicle.PlateText = (from p in db.PlateTexts
                                                 where p.Id == item.PlateTextId
                                                 select p.Text).FirstOrDefault();
                        }
                        response.Vehicle.Add(vehicle);
                    }

                }
                response.Msg = "success";
            }
            return response;
        }
        #endregion

        #region Approve Vehicle
        public Response ApproveVehicle(int Id)
        {
            Response response = new Response();
            using (VehiclesSystemEntities db = new VehiclesSystemEntities())
            {
                var result = db.Vehicles.FirstOrDefault(v => v.Id == Id);
                if (result != null)
                {
                    result.WaitingForApprove = false;
                    db.SaveChanges();
                    response.Msg = "success";
                }
                else
                {
                    response.Msg = "Fail!, wrong vehicle id";
                }

            }
            return response;
        }
        #endregion

        #region Reject Vehicle
        public Response RejectVehicle(int Id)
        {
            Response response = new Response();
            using (VehiclesSystemEntities db = new VehiclesSystemEntities())
            {
                var result = db.Vehicles.FirstOrDefault(v => v.Id == Id);
                if (result != null)
                {
                    if (result.PlateTextId != null)
                    {
                        var plateTextResult = db.PlateTexts.FirstOrDefault(p => p.Id == result.PlateTextId);
                        db.PlateTexts.Remove(plateTextResult);
                    }
                    db.Vehicles.Remove(result);
                    db.SaveChanges();
                    response.Msg = "success";
                }
                else
                {
                    response.Msg = "Fail!, wrong vehicle id";
                }

            }
            return response;
        }
        #endregion
    }
}