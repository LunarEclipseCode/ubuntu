import React, { Component } from 'react';

export class Chrome extends Component {
    constructor() {
        super();
        this.home_url = 'https://www.google.com/webhp?igu=1';
        this.state = {
            tabs: [{
                url: this.home_url,
                display_url: "https://www.google.com",
                title: "Google",
                history: [this.home_url],
                currentIndex: 0
            }],
            currentTabIndex: 0,
            isDropdownOpen: false
        };
    }

    componentDidMount() {
        this.injectCSS();
        let lastVisitedUrl = localStorage.getItem("chrome-url");
        let lastDisplayedUrl = localStorage.getItem("chrome-display-url");
        if (lastVisitedUrl !== null && lastVisitedUrl !== undefined) {
            this.setState({
                tabs: [{
                    url: lastVisitedUrl,
                    display_url: lastDisplayedUrl,
                    title: this.getTitleFromUrl(lastDisplayedUrl),
                    history: [lastVisitedUrl],
                    currentIndex: 0
                }],
                currentTabIndex: 0
            }, this.refreshChrome);
        }
    }

    injectCSS = () => {
        const css = `
            .tab {
                min-width: 100px;
            }

            .dropdown-menu {
                position: absolute;
                top: 40px;
                right: 10px;
                background: #222222;
                border: 1px solid #444444;
                border-radius: 5px;
                padding: 10px;
                z-index: 9999;
            }

            .dropdown-menu button {
                display: flex;
                width: 100%;
                text-align: left;
                background: none;
                border: none;
                color: #ffffff;
                cursor: pointer;
                padding: 0px;
                margin-right: 0.25rem;
            }

            .dropdown-menu button:hover {
                background: #444444;
            }

            .dropdown-icon {
                cursor: pointer;
                display: flex;
                align-items: center;
                background-color: #222222;
                border-radius: 5px;
                transition: background-color 0.2s;
            }

            .dropdown-icon:hover {
                background-color: #444444;
            }
        `;
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    storeVisitedUrl = (url, display_url) => {
        localStorage.setItem("chrome-url", url);
        localStorage.setItem("chrome-display-url", display_url);
    }

    refreshChrome = () => {
        document.getElementById("chrome-screen").src += '';
    }

    goToHome = () => {
        const { currentTabIndex, tabs } = this.state;
        const updatedTabs = tabs.map((tab, index) => {
            if (index === currentTabIndex) {
                return {
                    ...tab,
                    url: this.home_url,
                    display_url: "https://www.google.com",
                    title: "Google",
                    history: [...tab.history, this.home_url],
                    currentIndex: tab.history.length
                };
            }
            return tab;
        });
        this.setState({ tabs: updatedTabs }, this.refreshChrome);
    }

    navigateToUrl = (url) => {
        let display_url = url;

        const title = this.getTitleFromUrl(display_url);
        const { currentTabIndex, tabs } = this.state;

        if (url.includes("google.com")) {
            url = 'https://www.google.com/webhp?igu=1';
            display_url = "https://www.google.com";
        }

        const updatedTabs = tabs.map((tab, index) => {
            if (index === currentTabIndex) {
                return {
                    ...tab,
                    url,
                    display_url,
                    title,
                    history: [...tab.history.slice(0, tab.currentIndex + 1), url],
                    currentIndex: tab.currentIndex + 1
                };
            }
            return tab;
        });

        this.setState({ tabs: updatedTabs }, () => {
            this.storeVisitedUrl(url, display_url);
            this.refreshChrome();
        });
    }

    checkKey = (e) => {
        if (e.key === "Enter") {
            let url = e.target.value.trim();
            if (url.length === 0) return;

            if (url.indexOf("http://") !== 0 && url.indexOf("https://") !== 0) {
                url = "https://" + url;
            }

            url = encodeURI(url);
            this.navigateToUrl(url);
        }
    }

    handleDisplayUrl = (e) => {
        const { currentTabIndex, tabs } = this.state;
        tabs[currentTabIndex].display_url = e.target.value;
        this.setState({ tabs });
    }

    addTab = (url = this.home_url) => {
        const newTab = {
            url,
            display_url: url,
            title: this.getTitleFromUrl(url),
            history: [url],
            currentIndex: 0
        };
        this.setState(prevState => ({
            tabs: [...prevState.tabs, newTab],
            currentTabIndex: prevState.tabs.length
        }));
    }

    closeTab = (index) => {
        let { tabs, currentTabIndex } = this.state;
        if (tabs.length > 1) {
            tabs.splice(index, 1);
            if (currentTabIndex >= index) {
                currentTabIndex = Math.max(currentTabIndex - 1, 0);
            }
            this.setState({ tabs, currentTabIndex }, this.refreshChrome);
        }
    }

    switchTab = (index) => {
        this.setState({ currentTabIndex: index, isDropdownOpen: false }, this.refreshChrome);
    }

    getTitleFromUrl = (url) => {
        try {
            const hostname = new URL(url).hostname;
            const parts = hostname.split('.');
            
            if (hostname.startsWith('www.')) {
                return parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
            } else {
                return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
            }
        } catch (error) {
            return "New Tab";
        }
    }

    goBack = () => {
        const { currentTabIndex, tabs } = this.state;
        const currentTab = tabs[currentTabIndex];
        if (currentTab.currentIndex > 0) {
            const newIndex = currentTab.currentIndex - 1;
            this.setState({
                tabs: tabs.map((tab, index) => index === currentTabIndex ? {
                    ...tab,
                    url: tab.history[newIndex],
                    display_url: tab.history[newIndex],
                    currentIndex: newIndex
                } : tab)
            }, this.refreshChrome);
        }
    }

    goForward = () => {
        const { currentTabIndex, tabs } = this.state;
        const currentTab = tabs[currentTabIndex];
        if (currentTab.currentIndex < currentTab.history.length - 1) {
            const newIndex = currentTab.currentIndex + 1;
            this.setState({
                tabs: tabs.map((tab, index) => index === currentTabIndex ? {
                    ...tab,
                    url: tab.history[newIndex],
                    display_url: tab.history[newIndex],
                    currentIndex: newIndex
                } : tab)
            }, this.refreshChrome);
        }
    }

    toggleDropdown = () => {
        this.setState(prevState => ({
            isDropdownOpen: !prevState.isDropdownOpen
        }));
    }

    renderTabs = () => {
        const { tabs, currentTabIndex } = this.state;
        const totalTabsWidth = tabs.length * 150;
        const tabWidth = totalTabsWidth > window.innerWidth ? window.innerWidth / tabs.length : 150;

        return (
            <div className="flex overflow-x-auto scrollbar-hide relative mr-16">
                {tabs.map((tab, index) => (
                    <div 
                        key={index} 
                        className={`flex items-center px-2 py-1 mx-0.5 my-1 rounded-md ${index === currentTabIndex ? 'bg-[#111111] text-white' : 'bg-[#222222] text-gray-400'} hover:bg-[#444444] tab`}
                        style={{ width: tabWidth, cursor: 'pointer', transition: 'background-color 0.2s' }}
                    >
                        <span onClick={() => this.switchTab(index)} className="flex-grow cursor-pointer overflow-hidden whitespace-nowrap overflow-ellipsis">{tab.title}</span>
                        <button onClick={() => this.closeTab(index)} className="ml-2">&times;</button>
                    </div>
                ))}
                <button 
                    onClick={() => this.addTab()} 
                    className={`px-2 py-1 my-1 ml-0.5 bg-[#222222] text-gray-400 rounded-md hover:bg-[#444444] ${totalTabsWidth + 200 > window.innerWidth ? 'fixed right-0 mr-8' : ''}`} 
                    style={{ transition: 'background-color 0.2s' }}
                >
                    +
                </button>
                <div className="dropdown-icon fixed right-0" onClick={this.toggleDropdown}>
                    <svg height="24" viewBox="0 0 24 24" width="24" fill = "#ffffff" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 16.5l-4-4h8z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                </div>
            </div>
        );
    }

    renderDropdown = () => {
        const { tabs } = this.state;
        return (
            <div className="dropdown-menu">
                {tabs.map((tab, index) => (
                    <button key={index} onClick={() => this.switchTab(index)}>
                        {tab.title}
                    </button>
                ))}
            </div>
        );
    }

    render() {
        const { tabs, currentTabIndex, isDropdownOpen } = this.state;
        const currentTab = tabs[currentTabIndex];

        return (
            <div className="h-full w-full flex flex-col bg-ub-cool-grey">
                <div className="relative">
                    {this.renderTabs()}
                    {isDropdownOpen && this.renderDropdown()}
                </div>
                <div className="w-full pb-1 flex justify-start items-center text-white text-sm border-b border-gray-900">
                    <div onClick={this.goBack} className={`mr-2 ml-1 flex justify-center items-center rounded-full bg-gray-50 bg-opacity-0 hover:bg-opacity-10 ${currentTab.currentIndex === 0 ? 'cursor-not-allowed' : ''}`}>
                        <img className="w-5" src="./themes/Yaru/status/chrome_back.svg" alt="Ubuntu Chrome Back" />
                    </div>
                    <div onClick={this.goForward} className={`mr-2 ml-1 flex justify-center items-center rounded-full bg-gray-50 bg-opacity-0 hover:bg-opacity-10 ${currentTab.currentIndex === currentTab.history.length - 1 ? 'cursor-not-allowed' : ''}`}>
                        <img className="w-5" src="./themes/Yaru/status/chrome_forward.svg" alt="Ubuntu Chrome Forward" />
                    </div>
                    <div onClick={this.goToHome} className=" mr-2 ml-1 flex justify-center items-center rounded-full bg-gray-50 bg-opacity-0 hover:bg-opacity-10">
                        <img className="w-5" src="./themes/Yaru/status/chrome_home.svg" alt="Ubuntu Chrome Home" />
                    </div>
                    <input onKeyDown={this.checkKey} onChange={this.handleDisplayUrl} value={currentTab.display_url} id="chrome-url-bar" className="outline-none bg-ub-grey rounded-full pl-3 py-1.5 mr-3 w-5/6 text-gray-300 focus:text-white" type="url" spellCheck={false} autoComplete="off" />
                </div>
                <div className="flex-grow flex">
                    <div className="w-12 bg-gray-900 text-white flex flex-col items-center py-2">
                        <button onClick={() => this.addTab('https://www.wikipedia.org')} className="mb-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png" alt="Wikipedia" className="w-10 h-10 rounded-full hover:bg-gray-800 p-1" />
                        </button>
                        <button onClick={() => this.addTab('https://archive.org')} className="mb-4">
                            <img src="https://archive.org/images/glogo.jpg" alt="Internet Archive" className="w-10 h-10 rounded-full hover:bg-gray-800 p-1" />
                        </button>
                    </div>
                    <iframe src={currentTab.url} className="flex-grow" id="chrome-screen" frameBorder="0" title="Ubuntu Chrome Url"></iframe>
                </div>
            </div>
        );
    }
}

export default Chrome;

export const displayChrome = () => {
    return <Chrome />;
}
