PennController.ResetPrefix(null) // Shorten command names (keep this line here))
newTrial("setup",
    // Automatically print all Text elements
   defaultText
       .cssContainer({"margin-bottom":"1em", "margin-left":"5em"})
       .print()
   ,
   defaultTextInput
       .css("margin","1em")    // Add a 1em margin around this element
       .css("margin-left", "6em")
       .print()
       ,
   defaultDropDown
       .css("margin","1em")    // Add a 1em margin around this element
       .css("margin-left", "6em")
       .print()
       ,
   newText("Hi!")
   ,
   newText("To get started, we'll collect some basic information so that we can assign you credit and compare results across English language background groups.Enter your uniqname (<b>without the @umich.edu</b>):")
   ,
   // ID input
   newTextInput("inputID", "")
   ,
   newText("We will be using a 'secret code' to share your data so that you can find it but others cannot identify it as yours for all experiments run in this class. You should use the same code for all experiments, so create one and note it down (or add to a password keeper) to be able to find your results and use on other future experiments. If you have already created a code for another experiment, enter that one here. If you haven't created your code yet, please make one that is <b>at least 8 characters long</b>. This should be something relatively unique, but appropriate for sharing with the class on an open website. Data with missing, offensive, or inappropriate codes will not be posted (so you will not be able to see your result):")
   ,
   // ID input
   newTextInput("codeID", "")
   ,
   newText("Was <b>English</b> a primary or dominant language of your environment for most of your first ten years?")
   ,
   // English input
   newDropDown("inputEnglish" , "")
       .add( "yes" , "no" )
   ,
   newText("Was a <b>language other than English</b> a primary or dominant language of your environment for most of your first ten years? (including those bilingual with English)")
   ,
   // NonEnglish input
   newDropDown("inputNonEnglish" , "")
       .add( "yes" , "no" )
   ,
   newButton("Start")
       .center()
       .print()
       // Only validate a click on Start when inputID has been filled
       .wait( getTextInput("inputID").testNot.text("") )
   ,
   // Store the text from inputID into the Var element
   newVar("partID")
       .global()
       .set(getTextInput("inputID") )
   ,
   newVar("codeID")
       .global()
       .set(getTextInput("codeID") )
   ,
   newVar("English")
       .global()
       .set(getDropDown("inputEnglish") )
   ,
   newVar("NonEnglish")
       .global()
       .set(getDropDown("inputNonEnglish") )
)
.log("English", getVar("English"))
.log("NonEnglish", getVar("NonEnglish"))

// This is run at the beginning of each trial
Header(
   // log the partID and codeID 
)
.log( "partid" , getVar("partID") ) // Add the ID to all trials' results lines
.log( "codeid" , getVar("codeID") ) // Add the ID to all trials' results lines
