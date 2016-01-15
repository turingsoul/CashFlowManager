# CashFlowManager
  Background: In the era of social data explosion,once the data transfers from local to net,there must be safety
  problem.if your personal information is known by a website,you can hardly say if it can be attack by "black hat"
  ,even if the websites dont't have bad purpose itself;so,i think some software like alipay is unable to statistics 
  the real property information.

  so,this is a  "offline" software that used to manage your cashFlow.it is created to protect the property information
  ,and improve people's asset management awareness,just as advocated by the novel <<richdad and poordad>>

  
  this software use html5's localdatabase to storage data.
  
  export reports we use node.js.(reason:native javascript have security permissions issues)

  if you want to run the guy.you need  to first of all install node and your browser need to support the local database.

  1.login function
    first, login need to set a password,not include username(we have some special reason) . set the password is to prevent
    your information is glanced by someone you don't want him to see it.
    (if you forget your password ,sorry,you need to reinstall your browser to reset your software)

  2.data encryption
    even if your workmate open F12,he still can not see the data details

  3.data visualization
    cash flow information will be display by two method.table and chart.
  
  4.report generation
    on windows,run the run.bat ,you can start the node server.activate the generation function.
  
  5.cashFlow CRUD

  6.data backup and dataread
    In order to transfer data,we add the function to generate a csv file and so on.you can take it to anywhere 
    and read it out use another offline software
  
  this is the guy-- CashFlowManager

