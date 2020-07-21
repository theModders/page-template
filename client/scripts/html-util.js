export default {
	importStyle(url, config) {
		if (document.querySelector(`link[rel='stylesheet'][href='${url}']`)) {
			return; // already loaded
		}
		console.log("loading", url);
		this.addMetadata("link", { 
			rel: "stylesheet", 
			href: config.CLIENT_URL + url 
		});
	},

	importScript(url, config) {
		if (document.querySelector(`script[src='${url}']`)) {
			return; // already loaded
		}
		console.log("loading", url);
		this.addMetadata("script", {
			src: config.CLIENT_URL + url 
		});
	},

	configureClient(config) {
		this.addMetadata("meta", { 
			name: "viewport", 
			content: "width=device-width,initial-scale=1"
		});
		this.addMetadata("meta", { 
			name: "theme-color", 
			content: config.THEME_COLOR
		});
		this.addMetadata("meta", { 
			name: "apple-mobile-web-app-capable", 
			content: "yes" // enables full-screen / standalone mode
		});
		this.addMetadata("meta", { 
			name: "apple-mobile-web-app-status-bar-style", 
			content: "black-translucent"
		});
		this.addMetadata("link", { 
			href: "/favicon.ico", 
			rel: "icon"
		});
		this.addMetadata("link", { 
			href: "/feed.xml", 
			type: "application/rss+xml",
			rel: "alternate"
		});
		this.importScript("/scripts/turbolinks.js", config);
		this.importStyle("/fonts/material-icons/material-icons.css", config);
		document.fonts.load('16px "Material Icons"').then(this.enableMaterialIcons);
		document.addEventListener("turbolinks:load", this.enableMaterialIcons);
	},

	enableMaterialIcons() {
		document.body.classList.add("custom-fonts");
	},

	addMetadata(elementName, properties) {
		const element = document.createElement(elementName);
		for (var propertyName in properties) {
			element[propertyName] = properties[propertyName];
		}
		document.head.appendChild(element);
	}
}