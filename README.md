Deploy scoring model
====================

This package illustrates how to deploy a model for remote scoring/prediction. 


    # Install in R
    library(devtools)
    install_github("opencpu/tvscore")

    # Score in R
    library(tvscore)
    mydata <- data.frame(
      TempOutside=c(9,18,14,27),
      QuantMilk=c("18", "14", "9", "5")
    )
    tv(input = mydata)

    # Score remotely
    curl https://public.opencpu.org/ocpu/github/opencpu/tvscore/R/tv/json \
      -H "Content-Type: application/json" \
      -d '{"input" : [ {"TempOutside":18, "QuantMilk" : 9}, {"TempOutside":27, "QuantMilk":"18"} ]}'
      
The model is included in the `data` directory of the package, and was created
using the [createmodel.R](https://github.com/opencpu/tvscore/blob/master/inst/tv/createmodel.R) script.
