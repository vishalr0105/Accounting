import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import MetisMenu from 'metismenujs';

import { MENU } from './menu';
import { MenuItem } from './menu.model';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NewroleService } from '../../services/newrole.service';
import { debug } from 'console';
// import { SubscriptionPlanService } from '../../services/subscription-plan.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  modules:any;
  @ViewChild('sidebarToggler') sidebarToggler: ElementRef;
  hidelabel = true;
  objCurUser:any;
  menuItems: MenuItem[] = [];
  @ViewChild('sidebarMenu') sidebarMenu: ElementRef;

  constructor(@Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    // public subscriptionservice:SubscriptionPlanService,
    private _newroleService: NewroleService,

    private renderer: Renderer2,private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {

        /**
         * Activating the current active item dropdown
         */
        this._activateMenuDropdown();

        /**
         * closing the sidebar
         */
        if (window.matchMedia('(max-width: 991px)').matches) {
          this.document.body.classList.remove('sidebar-open');
        }

      }
    });
  }

  ngOnInit(): void {
    this.getPermissions();

    //this.menuItems = MENU;
    this.objCurUser=JSON.parse(sessionStorage.getItem('current_user'));
    const desktopMedium = window.matchMedia('(min-width:992px) and (max-width: 1199px)');
    desktopMedium.addEventListener('change', () => {
      this.iconSidebar;
    });
    this.iconSidebar(desktopMedium);
    // this.subscriptionservice.CheckSubscriptionByUser(this.objCurUser.email).subscribe((res:any)=>{
    //   var subscriptionExpiryDate= new Date(res.next_billing_at*1000);
    //   var curdate=new Date();
    //   const differenceInMs: number = Math.abs(curdate.getTime() - subscriptionExpiryDate.getTime());
    //   const millisecondsInDay: number = 1000 * 60 * 60 * 24;
    //   var diff = Math.floor(differenceInMs / millisecondsInDay);

    //   this.getPermissions();
    //   if(diff>=0){
    //   }else{
    //     this.router.navigateByUrl('/admin/subscription');
    //   }
    // })


  }

  transformLabel(label: string): string {
    switch(label) {
      case 'CustomerService':
        return ' Customer Service';
        case 'NeedAssistance':
          return ' Need Assistance';
          case 'SubContractor':
            return 'Sub Contractor';
            case 'ProductsServices':
              return 'Products & Services'
      default:
        return label;
    }
  }
  getPermissions() {
    this._newroleService.getMenusbyUser().subscribe((res) => {
      this.modules = res;
      this.menuItems = [];
      this.modules.forEach(m => {
        var submenu = [];
        m.features.forEach((n: any) => {
          submenu.push({ parentId: m.moduleId, link: n.url, label: n.name, icon: n.icon })
        });
        m.name = m.name.replace(/\s/g, "")
        this.menuItems.push({
//          icon: submenu.length > 0 ?submenu[0].icon:'',
         icon:m.icon,
          label: m.name,
         isTitle: submenu.length == 0?true:false,
          subItems: submenu,
          expanded: true,
          id:m.moduleId,
         link:submenu.length==0?m.url:'#'
        })
        // console.log(this.menuItems,'this.menuItems========');

      })
      // this.router.navigate(['/role-and-permission/add', 5]);
      // console.log(res, '<========res========>');
    });

  }

  ngAfterViewInit() {
    // activate menu item
    if(this.sidebarMenu!==null && this.sidebarMenu!==undefined){
    new MetisMenu(this.sidebarMenu?.nativeElement);
    }

    this._activateMenuDropdown();

  }

  /**
   * Toggle sidebar on hamburger button click
   */
  toggleSidebar(e: Event) {
    this.sidebarToggler.nativeElement.classList.toggle('active');
    this.sidebarToggler.nativeElement.classList.toggle('not-active');
    if (window.matchMedia('(min-width: 992px)').matches) {
      e.preventDefault();
      this.document.body.classList.toggle('sidebar-folded');
    } else if (window.matchMedia('(max-width: 991px)').matches) {
      e.preventDefault();
      this.document.body.classList.toggle('sidebar-open');
    }
    this.hidelabel = !this.hidelabel;
  }


  /**
   * Toggle settings-sidebar
   */
  toggleSettingsSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('settings-open');
  }


  /**
   * Open sidebar when hover (in folded folded state)
   */
  operSidebarFolded() {
    //if (this.document.body.classList.contains('sidebar-folded')) {
    //  this.document.body.classList.add("open-sidebar-folded");
    //}

  }


  /**
   * Fold sidebar after mouse leave (in folded state)
   */
  closeSidebarFolded() {
    //if (this.document.body.classList.contains('sidebar-folded')) {
    //  this.document.body.classList.remove("open-sidebar-folded");
    //}
  }

  /**
   * Sidebar-folded on desktop (min-width:992px and max-width: 1199px)
   */
  iconSidebar(mq: MediaQueryList) {
    if (mq.matches) {
      this.document.body.classList.add('sidebar-folded');
    } else {
      this.document.body.classList.remove('sidebar-folded');
    }
  }


  /**
   * Switching sidebar light/dark
   */
  onSidebarThemeChange(event: Event) {
    this.document.body.classList.remove('sidebar-light', 'sidebar-dark');
    this.document.body.classList.add((<HTMLInputElement>event.target).value);
    this.document.body.classList.remove('settings-open');
  }


  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {

    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  /**
   * Reset the menus then hilight current active menu item
   */
  _activateMenuDropdown() {
    this.resetMenuItems();
    this.activateMenuItems();
  }

  /**
   * Resets the menus
   */
  resetMenuItems() {

    const links = document.getElementsByClassName('nav-link-ref');

    for (let i = 0; i < links.length; i++) {
      const menuItemEl = links[i];
      menuItemEl.classList.remove('mm-active');
      const parentEl = menuItemEl.parentElement;

      if (parentEl) {
        parentEl.classList.remove('mm-active');
        const parent2El = parentEl.parentElement;

        if (parent2El) {
          parent2El.classList.remove('mm-show');
        }

        const parent3El = parent2El?.parentElement;
        if (parent3El) {
          parent3El.classList.remove('mm-active');

          if (parent3El.classList.contains('side-nav-item')) {
            const firstAnchor = parent3El.querySelector('.side-nav-link-a-ref');

            if (firstAnchor) {
              firstAnchor.classList.remove('mm-active');
            }
          }

          const parent4El = parent3El.parentElement;
          if (parent4El) {
            parent4El.classList.remove('mm-show');

            const parent5El = parent4El.parentElement;
            if (parent5El) {
              parent5El.classList.remove('mm-active');
            }
          }
        }
      }
    }
  };

  /**
   * Toggles the menu items
   */
  activateMenuItems() {

    const links: any = document.getElementsByClassName('nav-link-ref');

    let menuItemEl = null;

    for (let i = 0; i < links.length; i++) {
      // tslint:disable-next-line: no-string-literal
      if (window.location.pathname === links[i]['pathname']) {

        menuItemEl = links[i];

        break;
      }
    }

    if (menuItemEl) {
      menuItemEl.classList.add('mm-active');
      const parentEl = menuItemEl.parentElement;

      if (parentEl) {
        parentEl.classList.add('mm-active');

        const parent2El = parentEl.parentElement;
        if (parent2El) {
          parent2El.classList.add('mm-show');
        }

        const parent3El = parent2El.parentElement;
        if (parent3El) {
          parent3El.classList.add('mm-active');

          if (parent3El.classList.contains('side-nav-item')) {
            const firstAnchor = parent3El.querySelector('.side-nav-link-a-ref');

            if (firstAnchor) {
              firstAnchor.classList.add('mm-active');
            }
          }

          const parent4El = parent3El.parentElement;
          if (parent4El) {
            parent4El.classList.add('mm-show');

            const parent5El = parent4El.parentElement;
            if (parent5El) {
              parent5El.classList.add('mm-active');
            }
          }
        }
      }
    }
  };

}
