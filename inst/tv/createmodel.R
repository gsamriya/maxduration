#This script was used to create the model that is included with the package

HMFTempData2 <- read.csv("HMFTempRiseData_Feb2024consolidated.csv")

set.seed(4543)

sample_data = sample.split(HMFTempData2, SplitRatio = 0.8)
train_data <- subset(HMFTempData2, sample_data == TRUE)
test_data <- subset(HMFTempData2, sample_data == FALSE)

#model random forrest
#install.packages('randomForest')
#library(randomForest)
#tv_model <- randomForest( TempRise ~ ., data=train_data, ntree=1000, keep.forest=TRUE, importance=TRUE)

#model linear regression
tv_model <- lm(TempRise~SizeBag_Big+SizeBag_Medium+Quant_Milk+TempOutside+Car, data = train_data)

#Vizualize the model
library(ggplot2)
ImpData <- as.data.frame(importance(tv_model))
ImpData$Var.Names <- row.names(ImpData)
ggplot(ImpData, aes(x=Var.Names, y=`%IncMSE`)) +
  geom_segment( aes(x=Var.Names, xend=Var.Names, y=0, yend=`%IncMSE`), color="skyblue") +
  geom_point(aes(size = IncNodePurity), color="blue", alpha=0.6) +
  theme_light() +
  coord_flip() +
  theme(
    legend.position="bottom",
    panel.grid.major.y = element_blank(),
    panel.border = element_blank(),
    axis.ticks.y = element_blank()
  )

#Save the model
dir.create("data", showWarnings=FALSE)
save(tv_model, file="data/tv_model.rda")
