package com.basic.app.domain.system;

import com.basic.app.domain.base.Organization;
import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="SYSTEM_MENU")
public class SystemMenu {

    @Id
    @GeneratedValue(generator="SysPkIdSeq")
    @SequenceGenerator(name="SysPkIdSeq",sequenceName="SYS_PKID_SEQ", allocationSize=5)
    @Column(name = "ID")
    Long id;

    // for null handleOrganization --- default our organize menu use
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "handle_organization_id")
    Organization handleOrganization; // if this tik, then system will load menu by searching this organization
    @Column(unique = true)
    String code; // menuCode is unique for all, if needed then user will add menuCode+orgCode
    String description;

    String entityName;
    String openUrl;
    Integer sequence;
    String iconHtml;
    Boolean hasChild;
    Boolean visibleToAll;
    String chkAuthorization;
    String chkAuthorizationChar;
    Boolean leftSideMenu;
    Boolean dashboardMenu;
    Boolean mainHeaderMenu;

    Boolean isChild;
    Boolean isOpenNewTab;
    Boolean isActive;

//    @OneToMany(
//            targetEntity = SystemMenu.class,
//            mappedBy = "systemMenu",
//            cascade = {CascadeType.ALL},
//            orphanRemoval = true
//            )
//    private List< SystemMenu > childMenus;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "parent_menu_id", referencedColumnName = "id")
    SystemMenu parentMenu;
    String parentMenuCode;

    Boolean superAdminAccessOnly;
    Boolean adminAccessOnly;

    // System log fields
    Date creationDateTime;
    String creationUser;
    Date lastUpdateDateTime;
    String lastUpdateUser;


    public SystemMenu() {
    }
    public SystemMenu(String code, String description, String openUrl, String iconHtml, Boolean isActive, Integer sequence) {
        this.code = code;
        this.description = description;
        this.openUrl = openUrl;
        this.iconHtml = iconHtml;
        this.isActive = isActive;
        this.sequence = sequence;
//        this.parentMenu = parentMenu;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Organization getHandleOrganization() {
        return handleOrganization;
    }

    public void setHandleOrganization(Organization handleOrganization) {
        this.handleOrganization = handleOrganization;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public String getOpenUrl() {
        return openUrl;
    }

    public void setOpenUrl(String openUrl) {
        this.openUrl = openUrl;
    }

    public Integer getSequence() {
        return sequence;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }

    public String getIconHtml() {
        return iconHtml;
    }

    public void setIconHtml(String iconHtml) {
        this.iconHtml = iconHtml;
    }

    public Boolean getHasChild() {
        return hasChild;
    }

    public void setHasChild(Boolean hasChild) {
        this.hasChild = hasChild;
    }

    public Boolean getVisibleToAll() {
        return visibleToAll;
    }

    public void setVisibleToAll(Boolean visibleToAll) {
        this.visibleToAll = visibleToAll;
    }

    public String getChkAuthorization() {
        return chkAuthorization;
    }

    public void setChkAuthorization(String chkAuthorization) {
        this.chkAuthorization = chkAuthorization;
    }

    public String getChkAuthorizationChar() {
        return chkAuthorizationChar;
    }

    public void setChkAuthorizationChar(String chkAuthorizationChar) {
        this.chkAuthorizationChar = chkAuthorizationChar;
    }

    public Boolean getLeftSideMenu() {
        return leftSideMenu;
    }

    public void setLeftSideMenu(Boolean leftSideMenu) {
        this.leftSideMenu = leftSideMenu;
    }

    public Boolean getDashboardMenu() {
        return dashboardMenu;
    }

    public void setDashBoardMenu(Boolean dashboardMenu) {
        this.dashboardMenu = dashboardMenu;
    }

    public Boolean getMainHeaderMenu() {
        return mainHeaderMenu;
    }

    public void setMainHeaderMenu(Boolean mainHeaderMenu) {
        this.mainHeaderMenu = mainHeaderMenu;
    }

    public Boolean getChild() {
        return isChild;
    }

    public void setChild(Boolean child) {
        isChild = child;
    }

    public Boolean getOpenNewTab() {
        return isOpenNewTab;
    }

    public void setOpenNewTab(Boolean openNewTab) {
        isOpenNewTab = openNewTab;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public SystemMenu getParentMenu() {
        return parentMenu;
    }

    public void setParentMenu(SystemMenu parentMenu) {
        this.parentMenu = parentMenu;
    }

    public String getParentMenuCode() {
        return parentMenuCode;
    }

    public void setParentMenuCode(String parentMenuCode) {
        this.parentMenuCode = parentMenuCode;
    }

    public Boolean getSuperAdminAccessOnly() {
        return superAdminAccessOnly;
    }

    public void setSuperAdminAccessOnly(Boolean superAdminAccessOnly) {
        this.superAdminAccessOnly = superAdminAccessOnly;
    }

    public Boolean getAdminAccessOnly() {
        return adminAccessOnly;
    }

    public void setAdminAccessOnly(Boolean adminAccessOnly) {
        this.adminAccessOnly = adminAccessOnly;
    }

    public Date getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(Date creationDateTime) {
        this.creationDateTime = creationDateTime;
    }

    public String getCreationUser() {
        return creationUser;
    }

    public void setCreationUser(String creationUser) {
        this.creationUser = creationUser;
    }

    public Date getLastUpdateDateTime() {
        return lastUpdateDateTime;
    }

    public void setLastUpdateDateTime(Date lastUpdateDateTime) {
        this.lastUpdateDateTime = lastUpdateDateTime;
    }

    public String getLastUpdateUser() {
        return lastUpdateUser;
    }

    public void setLastUpdateUser(String lastUpdateUser) {
        this.lastUpdateUser = lastUpdateUser;
    }

//    public List<SystemMenu> getChildMenus() {
//        return childMenus;
//    }
//
//    public void setChildMenus(List<SystemMenu> childMenus) {
//        this.childMenus = childMenus;
//    }


}
