// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

using AutoMapper;
using DAL.Core;
using DAL.Models;
using Microsoft.AspNetCore.Identity;
using WFM.ViewModels.Dtos;

namespace WFM.ViewModels
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<AccountTable, AccountTableDto>().ReverseMap();
            CreateMap<AccountDto, AccountTable>();

            CreateMap<ApplicationUser, UserViewModel>()
                   .ForMember(d => d.Roles, map => map.Ignore());

            CreateMap<UserViewModel, ApplicationUser>()
                .ForMember(d => d.Roles, map => map.Ignore())
                .ForMember(d => d.Id, map => map.Condition(src => src.Id != null));

            CreateMap<UserCreateModel, ApplicationUser>()
                .ForMember(d => d.Roles, map => map.Ignore());

            CreateMap<ApplicationUser, UserEditViewModel>()
                .ForMember(d => d.Roles, map => map.Ignore());

            CreateMap<UserEditViewModel, ApplicationUser>()
                .ForMember(d => d.Roles, map => map.Ignore())
                .ForMember(d => d.Id, map => map.Condition(src => src.Id != null));

            CreateMap<ApplicationUser, UserPatchViewModel>()
                .ReverseMap();

            CreateMap<ApplicationUser, UserProfilePatchViewModel>()
                .ReverseMap();

            CreateMap<ApplicationRole, RoleViewModel>()
                .ForMember(d => d.Permissions, map => map.MapFrom(s => s.Claims))
                .ForMember(d => d.UsersCount, map => map.MapFrom(s => s.Users != null ? s.Users.Count : 0))
                .ReverseMap();

            CreateMap<RoleViewModel, ApplicationRole>()
                .ForMember(d => d.Id, map => map.Condition(src => src.Id != null));

            CreateMap<IdentityRoleClaim<string>, ClaimViewModel>()
                .ForMember(d => d.Type, map => map.MapFrom(s => s.ClaimType))
                .ForMember(d => d.Value, map => map.MapFrom(s => s.ClaimValue))
                .ReverseMap();

            CreateMap<ApplicationPermission, PermissionViewModel>()
                .ReverseMap();

            CreateMap<IdentityRoleClaim<string>, PermissionViewModel>()
                .ConvertUsing(s => (PermissionViewModel)ApplicationPermissions.GetPermissionByValue(s.ClaimValue));

            CreateMap<Company, CompanyDto>().ReverseMap();

            CreateMap<InvoiceModel, InvoiceModelDto>()
                .ForMember(x => x.email, map => map.MapFrom(x => x.customer.CompanyEmailID))
                .ForMember(x => x.Address, map => map.MapFrom(x => x.customer.ServiceAddress))
                .ForMember(x => x.customerName, map => map.MapFrom(x => x.customer.AccountName));
    
            CreateMap<Company, CompanyDto>().ReverseMap();
            CreateMap<ApplicationUser, UserAuthDto>().ReverseMap();

            CreateMap<ContactsMasterTable, ContactsDto>()
                .ForMember(x => x.Account_Name, map => map.MapFrom(x => x.Account.AccountName))
                .ForMember(x => x.Company_name, map => map.MapFrom(x => x.Company.CompanyName));

        }
    }
}
