# CLIENT-SERVER


Computers connected to the web are called clients and servers.
Clients are the typical web user's internet-connected devices (for example, your computer connected to your Wi-Fi, or your phone connected to your mobile network) and web-accessing software available on those devices (usually a web browser like Firefox or Chrome).


Servers are computers that store webpages, sites, or apps. When a client device wants to access a webpage, a copy of the webpage is downloaded from the server onto the client machine to be displayed in the user's web browser.


## CLIENT-SERVER ARCHITECTURE

Clients are the typical web user's internet-connected devices (for example, your computer connected to your Wi-Fi, or your phone connected to your mobile network) and web-accessing software available on those devices (usually a web browser like Firefox or Chrome).
Servers are computers that store webpages, sites, or apps. When a client device wants to access a webpage, a copy of the webpage is downloaded from the server onto the client machine to be displayed in the user's web browser.

The client-server architecture is also termed as a network-computing structure because every request and their associated services are distributed over a network. So now the question is how the thing works? In the client-server architecture, when the client computer sends a request for data to the server through the internet, the server accepts the requested, process it and deliver the data packets requested back to the client. One special feature is that the server computer has the potential to manage numerous clients at the same time. Also, a single client can connect to numerous servers at a single timestamp, where each server provides a different set of services to that specific client.

Let us take a scenario where we require today's weather data for our city. There will be someone, i.e., the server in which periodic updates regarding the weather will be updated and stored. Before the existence of computers, people get such news through the daily newspaper or may listen to the radio broadcasting weather news. In the modern world with computers and servers, there are two participants — first, the users, who scrounge for the weather report and the second is the weather info up-loaders (in the server) who provide the weather-related information. So these two participants are termed individually.

First of all, consumers who type specific URLs for weather reports and consume particular information. They are also called customers.
Second, there are providers, who upload their data on their system/server to provide information through the Internet. They are also called servers.
So, the clients and servers are two different computers in different parts of the world that are connected through the Internet. However, it is not compulsory to have the client, and the server resides miles apart, rather it could remain within the same building as well.

So, now we as a user can type that specific URL (let suppose any weather-forecasting site) and surf for the weather report. But some additional factors come into action with such online data gathering technologies. Your newspaper or radio uses your local language to give you the weather report and other information. But, for the client-server architecture on the web, specific factors need to be considered:

A specific set of languages along with a communication standard, exclusively a protocol for the interaction of two systems. The most popular are the HTTP and HTTPS (Hyper Text Transfer Protocol Secure).
Mechanism and protocol for requesting the required aspects from the server. That could be in any structure of formatted data. Mainly implemented and popular formats are done in XML and JSON.
Next, the server responds by sending a reply in a structure of formatted data, (usually XML or JSON).



### How HTTP Request Works

**The HTTP protocol**
First, I mention HTTPS in particular because things are different from an HTTPS connection.

**I analyze URL requests only**
Modern browsers have the capability of knowing if the thing you wrote in the address bar is an actual URL or a search term, and they will use the default search engine if it’s not a valid URL.

I assume you type an actual URL.

When you enter the URL and press enter, the browser first builds the full URL.

If you just entered a domain, like flaviocopes.com, the browser by default will prepend HTTP:// to it, defaulting to the HTTP protocol.

**DNS Lookup phase**
The browser starts the DNS lookup to get the server IP address.

The domain name is a handy shortcut for us humans, but the internet is organized in such a way that computers can look up the exact location of a server through its IP address, which is a set of numbers like 222.324.3.1 (IPv4).

First, it checks the DNS local cache, to see if the domain has already been resolved recently

**TCP request handshaking**
With the server IP address available, now the browser can initiate a TCP connection to that.

A TCP connection requires a bit of handshaking before it can be fully initialized and you can start sending data.

Once the connection is established, we can send the request

**Sending the request**
The request is a plain text document structured in a precise way determined by the communication protocol.

It’s composed of 3 parts:

the request line
the request header
the request body


**The request line**
The request line sets, on a single line:

* the HTTP method
* the resource location
* the protocol version

**The request body**
The request body is optional, not used in GET requests but very much used in POST requests and sometimes in other verbs too, and it can contain data in JSON format.

Since we’re now analyzing a GET request, the body is blank and we’ll not look more into it.

**The response**
Once the request is sent, the server processes it and sends back a response.

The response starts with the status code and the status message. If the request is successful and returns a 200, it will start with:

* 200 OK
The request might return a different status code and message, like one of these:

* 404 Not Found
* 403 Forbidden
* 301 Moved Permanently
* 500 Internal Server Error
* 304 Not Modified
* 401 Unauthorized
The response then contains a list of HTTP headers and the response body (which, since we’re making the request in the browser, is going to be HTML)

**Parse the HTML**
The browser now has received the HTML and starts to parse it, and will repeat the exact same process we did for all the resources required by the page:

* CSS files
* images
* the favicon
* JavaScript files
…
How browsers render the page then is out of the scope, but it’s important to understand that the process I described is not just for the HTML pages, but for any item that’s served over HTTP.
