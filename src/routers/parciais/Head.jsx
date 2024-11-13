import React, { useState } from 'react';

const Head = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  
  const handleOpenMenu = () => {
      const htmlElement = document.documentElement;

      if(openMenu){
        htmlElement.classList.remove('light-style', 'layout-navbar-fixed', 'layout-compact', 'layout-menu-100vh', 'layout-menu-fixed', 'layout-menu-expanded');
      }else{
        htmlElement.classList.add('light-style', 'layout-navbar-fixed', 'layout-compact', 'layout-menu-100vh', 'layout-menu-fixed', 'layout-menu-expanded');
      }     
  };


  const toggleLayout = () => {
      const htmlElement = document.documentElement;
      if (collapsed) {
          htmlElement.classList.remove('layout-menu-collapsed');
          htmlElement.classList.add('light-style', 'layout-navbar-fixed', 'layout-compact', 'layout-menu-fixed');
      } else {
          htmlElement.classList.remove('light-style', 'layout-navbar-fixed', 'layout-compact', 'layout-menu-fixed');
          htmlElement.classList.add('layout-menu-collapsed');
          htmlElement.classList.add('d-block');
      }
      setCollapsed(!collapsed);
  };


  const handleLogoff = () => {
    // Remove os tokens do localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  
    // Redireciona o usuário para a página de login
    window.location.href = `/Login`;
  };
   

  return (

      <nav
        className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar">
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-4 me-xl-0 d-xl-none">
          <a className="nav-item nav-link px-0 me-xl-6" href="#" onClick={ (e) => {e.preventDefault(); toggleLayout(); handleOpenMenu()}}>
            <i className="bx bx-menu bx-md"></i>
          </a>
        </div>

        <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
      
    

          <ul className="navbar-nav flex-row align-items-center ms-auto">
      
        {/* 
            <li className="nav-item dropdown-style-switcher dropdown me-2 me-xl-0">
              <a className="nav-link dropdown-toggle hide-arrow" href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="dropdown">
                <i className="bx bx-md"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-styles">
                <li>
                  <a className="dropdown-item" href="#" onClick={(e) => e.preventDefault()} data-theme="light">
                    <span><i className="bx bx-sun bx-md me-3"></i>Light</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={(e) => e.preventDefault()} data-theme="dark">
                    <span><i className="bx bx-moon bx-md me-3"></i>Dark</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={(e) => e.preventDefault()} data-theme="system">
                    <span><i className="bx bx-desktop bx-md me-3"></i>System</span>
                  </a>
                </li>
              </ul>
            </li>
          

            <li className="nav-item dropdown-shortcuts navbar-dropdown dropdown me-2 me-xl-0">
              <a
                className="nav-link dropdown-toggle hide-arrow"
                href="#" onClick={(e) => e.preventDefault()}
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false">
                <i className="bx bx-grid-alt bx-md"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-end p-0">
                <div className="dropdown-menu-header border-bottom">
                  <div className="dropdown-header d-flex align-items-center py-3">
                    <h6 className="mb-0 me-auto">Shortcuts</h6>
                    <a
                      href="#" onClick={(e) => e.preventDefault()}
                      className="dropdown-shortcuts-add py-2"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Add shortcuts"
                      ><i className="bx bx-plus-circle text-heading"></i
                    ></a>
                  </div>
                </div>
                <div className="dropdown-shortcuts-list scrollable-container">
                  <div className="row row-bordered overflow-visible g-0">
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                        <i className="bx bx-calendar bx-26px text-heading"></i>
                      </span>
                      <a href="app-calendar.html" className="stretched-link">Calendar</a>
                      <small>Appointments</small>
                    </div>
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                        <i className="bx bx-food-menu bx-26px text-heading"></i>
                      </span>
                      <a href="app-invoice-list.html" className="stretched-link">Invoice App</a>
                      <small>Manage Accounts</small>
                    </div>
                  </div>
                  <div className="row row-bordered overflow-visible g-0">
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                        <i className="bx bx-user bx-26px text-heading"></i>
                      </span>
                      <a href="app-user-list.html" className="stretched-link">User App</a>
                      <small>Manage Users</small>
                    </div>
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                        <i className="bx bx-check-shield bx-26px text-heading"></i>
                      </span>
                      <a href="app-access-roles.html" className="stretched-link">Role Management</a>
                      <small>Permission</small>
                    </div>
                  </div>
                  <div className="row row-bordered overflow-visible g-0">
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                        <i className="bx bx-pie-chart-alt-2 bx-26px text-heading"></i>
                      </span>
                      <a href="index.html" className="stretched-link">Dashboard</a>
                      <small>User Dashboard</small>
                    </div>
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                        <i className="bx bx-cog bx-26px text-heading"></i>
                      </span>
                      <a href="pages-account-settings-account.html" className="stretched-link">Setting</a>
                      <small>Account Settings</small>
                    </div>
                  </div>
                  <div className="row row-bordered overflow-visible g-0">
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                        <i className="bx bx-help-circle bx-26px text-heading"></i>
                      </span>
                      <a href="pages-faq.html" className="stretched-link">FAQs</a>
                      <small>FAQs & Articles</small>
                    </div>
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                        <i className="bx bx-window-open bx-26px text-heading"></i>
                      </span>
                      <a href="modal-examples.html" className="stretched-link">Modals</a>
                      <small>Useful Popups</small>
                    </div>
                  </div>
                </div>
              </div>
            </li> 

            <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-2">
              <a
                className="nav-link dropdown-toggle hide-arrow"
                href="#" onClick={(e) => e.preventDefault()}
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false">
                <span className="position-relative">
                  <i className="bx bx-bell bx-md"></i>
                  <span className="badge rounded-pill bg-danger badge-dot badge-notifications border"></span>
                </span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end p-0">
                <li className="dropdown-menu-header border-bottom">
                  <div className="dropdown-header d-flex align-items-center py-3">
                    <h6 className="mb-0 me-auto">Notification</h6>
                    <div className="d-flex align-items-center h6 mb-0">
                      <span className="badge bg-label-primary me-2">8 New</span>
                      <a
                        href="#" onClick={(e) => e.preventDefault()}
                        className="dropdown-notifications-all p-2"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Mark all as read"
                        ><i className="bx bx-envelope-open text-heading"></i
                      ></a>
                    </div>
                  </div>
                </li>
                <li className="dropdown-notifications-list scrollable-container">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item list-group-item-action dropdown-notifications-item">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar">
                            <img src="../../assets/img/avatars/1.png" className="rounded-circle" />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="small mb-0">Congratulation Lettie 🎉</h6>
                          <small className="mb-1 d-block text-body">Won the monthly best seller gold badge</small>
                          <small className="text-muted">1h ago</small>
                        </div>
                        <div className="flex-shrink-0 dropdown-notifications-actions">
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-notifications-read"
                            ><span className="badge badge-dot"></span
                          ></a>
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-notifications-archive"
                            ><span className="bx bx-x"></span
                          ></a>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item list-group-item-action dropdown-notifications-item">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar">
                            <span className="avatar-initial rounded-circle bg-label-danger">CF</span>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="small mb-0">Charles Franklin</h6>
                          <small className="mb-1 d-block text-body">Accepted your connection</small>
                          <small className="text-muted">12hr ago</small>
                        </div>
                        <div className="flex-shrink-0 dropdown-notifications-actions">
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-notifications-read"
                            ><span className="badge badge-dot"></span
                          ></a>
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-notifications-archive"
                            ><span className="bx bx-x"></span
                          ></a>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar">
                            <img src="../../assets/img/avatars/2.png" className="rounded-circle" />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="small mb-0">New Message ✉️</h6>
                          <small className="mb-1 d-block text-body">You have new message from Natalie</small>
                          <small className="text-muted">1h ago</small>
                        </div>
                        <div className="flex-shrink-0 dropdown-notifications-actions">
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-notifications-read"
                            ><span className="badge badge-dot"></span
                          ></a>
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-notifications-archive"
                            ><span className="bx bx-x"></span
                          ></a>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item list-group-item-action dropdown-notifications-item">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar">
                            <span className="avatar-initial rounded-circle bg-label-success"
                              ><i className="bx bx-cart"></i
                            ></span>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="small mb-0">Whoo! You have new order 🛒</h6>
                          <small className="mb-1 d-block text-body">ACME Inc. made new order $1,154</small>
                          <small className="text-muted">1 day ago</small>
                        </div>
                        <div className="flex-shrink-0 dropdown-notifications-actions">
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-notifications-read"
                            ><span className="badge badge-dot"></span
                          ></a>
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-notifications-archive"
                            ><span className="bx bx-x"></span
                          ></a>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar">
                            <img src="../../assets/img/avatars/9.png" className="rounded-circle" />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="small mb-0">Application has been approved 🚀</h6>
                          <small className="mb-1 d-block text-body"
                            >Your ABC project application has been approved.</small
                          >
                          <small className="text-muted">2 days ago</small>
                        </div>
                        <div className="flex-shrink-0 dropdown-notifications-actions">
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-notifications-read"
                            ><span className="badge badge-dot"></span
                          ></a>
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-notifications-archive"
                            ><span className="bx bx-x"></span
                          ></a>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar">
                            <span className="avatar-initial rounded-circle bg-label-success"
                              ><i className="bx bx-pie-chart-alt"></i
                            ></span>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="small mb-0">Monthly report is generated</h6>
                          <small className="mb-1 d-block text-body">July monthly financial report is generated </small>
                          <small className="text-muted">3 days ago</small>
                        </div>
                        <div className="flex-shrink-0 dropdown-notifications-actions">
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-notifications-read"
                            ><span className="badge badge-dot"></span
                          ></a>
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-notifications-archive"
                            ><span className="bx bx-x"></span
                          ></a>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar">
                            <img src="../../assets/img/avatars/5.png" className="rounded-circle" />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="small mb-0">Send connection request</h6>
                          <small className="mb-1 d-block text-body">Peter sent you connection request</small>
                          <small className="text-muted">4 days ago</small>
                        </div>
                        <div className="flex-shrink-0 dropdown-notifications-actions">
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-notifications-read"
                            ><span className="badge badge-dot"></span
                          ></a>
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-notifications-archive"
                            ><span className="bx bx-x"></span
                          ></a>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item list-group-item-action dropdown-notifications-item">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar">
                            <img src="../../assets/img/avatars/6.png" className="rounded-circle" />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="small mb-0">New message from Jane</h6>
                          <small className="mb-1 d-block text-body">Your have new message from Jane</small>
                          <small className="text-muted">5 days ago</small>
                        </div>
                        <div className="flex-shrink-0 dropdown-notifications-actions">
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-notifications-read"
                            ><span className="badge badge-dot"></span
                          ></a>
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-notifications-archive"
                            ><span className="bx bx-x"></span
                          ></a>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar">
                            <span className="avatar-initial rounded-circle bg-label-warning"
                              ><i className="bx bx-error"></i
                            ></span>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="small mb-0">CPU is running high</h6>
                          <small className="mb-1 d-block text-body"
                            >CPU Utilization Percent is currently at 88.63%,</small
                          >
                          <small className="text-muted">5 days ago</small>
                        </div>
                        <div className="flex-shrink-0 dropdown-notifications-actions">
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-notifications-read"
                            ><span className="badge badge-dot"></span
                          ></a>
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-notifications-archive"
                            ><span className="bx bx-x"></span
                          ></a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
                <li className="border-top">
                  <div className="d-grid p-4">
                    <a className="btn btn-primary btn-sm d-flex" href="#" onClick={(e) => e.preventDefault()}>
                      <small className="align-middle">View all notifications</small>
                    </a>
                  </div>
                </li>
              </ul>
            </li> */}
      
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <a
                className="nav-link dropdown-toggle hide-arrow p-0"
                href="#" onClick={(e) => e.preventDefault()}
                data-bs-toggle="dropdown">
                <div className="avatar avatar-online">
                <img src={`${process.env.PUBLIC_URL}/static/assets/img/avatars/5.png`} alt="Avatar" className="rounded-circle" />
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="pages-account-settings-account.html">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar avatar-online">
                        <img src={`${process.env.PUBLIC_URL}/static/assets/img/avatars/5.png`} alt="Avatar" className="rounded-circle" />
                          
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0">User</h6>
                        <small className="text-muted">Admin</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider my-1"></div>
                </li>
                {/* 
                <li>
                  <a className="dropdown-item" href="pages-profile-user.html">
                    <i className="bx bx-user bx-md me-3"></i><span>My Profile</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="pages-account-settings-account.html">
                    <i className="bx bx-cog bx-md me-3"></i><span>Settings</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="pages-account-settings-billing.html">
                    <span className="d-flex align-items-center align-middle">
                      <i className="flex-shrink-0 bx bx-credit-card bx-md me-3"></i
                      ><span className="flex-grow-1 align-middle">Billing Plan</span>
                      <span className="flex-shrink-0 badge rounded-pill bg-danger">4</span>
                    </span>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider my-1"></div>
                </li>
                <li>
                  <a className="dropdown-item" href="pages-pricing.html">
                    <i className="bx bx-dollar bx-md me-3"></i><span>Pricing</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="pages-faq.html">
                    <i className="bx bx-help-circle bx-md me-3"></i><span>FAQ</span>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider my-1"></div>
                </li>   */}
                <li>
                  <a className="dropdown-item" href="#" onClick={handleLogoff}>
                    <i className="bx bx-power-off bx-md me-3"></i><span>Sair</span>
                  </a>
                </li>
             
              </ul>
            </li>
           
          </ul>          
        </div>
      </nav> 
  )
}

export default Head