create  table GTK_PhoneHelper (
                                  ID INTEGER IDENTITY NOT NUll primary key,
                                  EnterpriseName VARCHAR(50),
                                  Department VARCHAR (50),
                                  Position VARCHAR (120),
                                  FIO VARCHAR(100),
                                  InnerPhone VARCHAR (50),
                                  OuterPhone1 VARCHAR (50),
                                  OuterPhone2 VARCHAR (50),
                                  Email VARCHAR (70),
                                  Skype VARCHAR (50),
                                  Cab VARCHAR (10)

)
GRANT SELECT ON dbo.GTK_PhoneHelper TO report
