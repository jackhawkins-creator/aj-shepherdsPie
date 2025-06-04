using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using ShepherdsPies.Data;
using ShepherdsPies.Models;

namespace ShepherdsPies.Controllers;

[ApiController]
[Route("api/[controller]")]

public class UserProfileController : ControllerBase
{
    private ShepherdsPiesDbContext _dbContext;

    public UserProfileController(ShepherdsPiesDbContext context)
    {
        _dbContext = context;
    }
    //GET allUserProfiles
    [HttpGet]
    [Authorize]
    public IActionResult GetAllUserProfiles()
    {
        return Ok(_dbContext.UserProfiles.ToList());
    }
}


