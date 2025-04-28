PredictiveMaintenance_history="""

    CREATE TABLE PredictiveMaintenance_history (         -- Table storing all tickets with their status
        PMId              TINYINT,        -- Primary ID of the ticket
        type_of_trigger   NVARCHAR(50),   -- Type of trigger events
        bearing          TINYINT,        -- Associated Mechanical bearing name
        tool             NVARCHAR(50),   -- Associated machine name
        vibrating_reason NVARCHAR(100),  -- Vibrating abnormality reason
        created_time     DATETIME2,      -- Ticket creation timestamp
        closed_by        nvarchar(250),    -- Person who closed the ticket  (NULL if not closed)
        closing_reason   NVARCHAR(50),   -- Reason for closing the ticket   (NULL if not closed)
        closing_time     NVARCHAR(50)    -- Flag to determine if the ticket is closed (NULL if not closed)
);
"""

# PredictiveMaintenance_results="""
#     CREATE TABLE PredictiveMaintenance_results (           -- Table storing only tickets are pending for closing
#     Id           TINYINT                -- Primary key (unique identifier)
#     PMId        TINYINT                  -- Foreign key reference to PredictiveMaintenance_history
#     type         NVARCHAR(50)           -- Trigger type 
#     factory      NVARCHAR(50)            -- Factory location
#     workstation  NVARCHAR(50)            -- Workstation info
#     tool         NVARCHAR(50)            -- Associated machine name
#     bearing      TINYINT                -- Associated Mechanical bearing name
#     reason       NVARCHAR(100)           -- Reason for closing the ticket
#     created_time DATETIME2               -- Ticket creation timestamp
# );
# """