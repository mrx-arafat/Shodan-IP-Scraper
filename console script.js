// Select all anchor tags within elements that contain IP addresses or domains
var ipElements = document.querySelectorAll(".heading a.title");

// Create an array to store the extracted IP addresses or domains
var ipList = [];

// Iterate over the selected elements and extract the IP addresses or domains
ipElements.forEach(function (element) {
  ipList.push(element.textContent);
});

// Join the list into a single string with each IP/domain on a new line
var ipText = ipList.join("\n");

// Display the IP addresses or domains
console.log(ipText);

// Optionally, copy the IP addresses or domains to the clipboard
var a = document.createElement("a");
a.href = "data:text/plain," + encodeURIComponent(ipText);
a.download = "ip_list.txt";
document.body.appendChild(a);
a.click();
document.body.removeChild(a);

alert("IP addresses/domains have been extracted and saved to a file.");
