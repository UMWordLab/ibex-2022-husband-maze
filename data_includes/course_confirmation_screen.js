PennController.ResetPrefix(null); // Shorten command names (keep this line here))

newTrial( "end" ,
    exitFullscreen(),
      newText("<p>You have completed the study. You should print or screenshot this confirmation for your records in case of any grading discrepancies, but you should not submit it to Canvas - grading will be based on the saved data.</p>")
          .center()
          .print()
      ,
      newVar("uniqname")
          .set( getVar("partID") ) // Fetch ID first, then insert it into the link
          .set( v => "<p> Your uniqname is "+v+". </p>" )
      ,
      newText()
          .text( getVar("uniqname") ) 
          .center()
          .print()
      ,
      newVar("secrettext")
          .set( getVar("codeID") ) // Fetch ID first, then insert it into the link
          .set( v => "<p>Your secret code is "+v+". </p>" )
      ,
      newText()
          .text( getVar("secrettext") ) 
          .center()
          .print()
      ,
      newVar("completiontimeset")
          .set ( v => "<p>Completion time: "+Date()+"</p>")
      ,
      newVar("completiontext")
          .set( getVar("completion") ) // Fetch ID first, then insert it into the link
          .set( v => "<p>Your completion code is "+v+". </p>" )
      ,
      newText()
          .text( getVar("completiontext") ) 
          .text( getVar("completiontimeset"))
          .center()
          .print()
      ,
      newButton("waitforever").wait() // Not printed: wait on this page forever
  ).setOption("countsForProgressBar",false);
  
  code = undefined // make it harder to fetch the code by other means

  