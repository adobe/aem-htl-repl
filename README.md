#AEM HTL Read–Eval–Print Loop

A live code editing environment for [HTL](https://docs.adobe.com/docs/en/htl.html) templates with optional server-side JavaScript logic, executed on an Adobe Experience Manager instance. This little tool is great for learning HTTL and for experimenting with it, because the resulting output is displayed as you type.

![](https://raw.githubusercontent.com/wiki/adobe-marketing-cloud/aem-htl-repl/screenshots/repl.png)

## Prerequisites

Adobe Experience Manager 6+, ideally running on port 4502 (if on a different port, adapt the instructions below).

## Install

Based on what you feel most comfortable with, pick one of the two following methods.

#### Click Method

1. Download the built package:
[com.adobe.granite.sightly.repl-1.0.2.zip](https://github.com/Adobe-Marketing-Cloud/aem-htl-repl/releases/download/aem-htl-repl-1.0.2/com.adobe.granite.sightly.repl-1.0.2.zip)
2. On your running AEM instance, go to [Package Manager](http://localhost:4502/crx/packmgr), click on **Upload Package**, browse to the previously downloaded package, and hit **OK**.
3. This will make a new package appear, called **com.adobe.granite.sightly.repl-1.0.2.zip**. Don't mind the missing dependencies, simply click the **Install** button and confirm.

#### Maven Method

1. Checked-out this repository with Git clone.
2. Build and install it with following command line instruction:  
  ```mvn clean install content-package:install```

## Run

On your AEM instance, got to following URL: [/content/repl.html](http://localhost:4502/content/repl.html)
