using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VehiclesSystem.BusinessManager;
using VehiclesSystem.Models;

namespace VehiclesSystem.Controllers
{
    public class UserController : ApiController
    {
        #region POST /users/register
        [Route("users/register")]
        [HttpPost]
        public Response AddUser(User user)
        {
            Manager manager = new Manager();

            Response response = new Response();
            response = manager.CreateUser(user.FirstName, user.LastName, user.Email, user.Password, user.Age, user.MobileNumber);
            return response;
        }
        #endregion


        #region POST /users/login
        [Route("users/login")]
        [HttpPost]
        public Response UserLogin(User user)
        {
            Manager manager = new Manager();

            Response response = new Response();
            response = manager.UserLogin(user.Email, user.Password);
            return response;
        }
        #endregion


        #region POST /users
        [Route("users")]
        [HttpPost]
        public Response GetAllUsers()
        {
            Manager manager = new Manager();

            Response response = new Response();
            response = manager.GetUsers();
            return response;
        }
        #endregion


    }
}