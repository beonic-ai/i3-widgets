# Beonic Insights 3.0 (i3) Widget Examples
This document contains example widget definitions using the Beonic Insights 3.0 widget definition language. Each widget defines a query against the Beonic data platform and visualization settings to present the retrieved tabular data.
## UserProfileCampaigns
#### Postcode Clicks
Count the number of regos that clicked a campaign
```json
{
  "keyAliases": {
    "country": [
      "Australia"
    ],
    "state": [
      "victoria"
    ],
    "campaignEventType": [
      "CLICKED"
    ]
  },
  "columnNames": [
    "Postcode",
    "Clicked",
    "Postcode Click Ratio"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "postcode"
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileCampaigns",
            "value": {
              "counter": "total"
            }
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        },
        {
          "numericExpression": {
            "$divide": [
              {
                "metric": "UserProfileCampaigns",
                "value": {
                  "counter": "total"
                }
              },
              {
                "metric": "UserProfileCampaigns",
                "value": {
                  "counter": "total"
                },
                "aggregateAcross": [
                  {
                    "key": "postcode"
                  }
                ]
              }
            ]
          },
          "unit": "percentage",
          "decimalPlaces": 2
        }
      ]
    }
  ],
  "visualisation": {
    "type": "Table",
    "title": "Postcode Clicks",
    "description": {
      "html": "Count the number of regos that clicked a campaign"
    },
    "imageFile": "",
    "tableSettings": {
      "columnSettings": {},
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```


**Visualization Preview:** This is a **data table visualization** showing "Postcode Clicks" performance metrics.

**Data displayed:**
- 9 postcodes (3181, 3141, 3182, 3004, 3183, 3000, 3142, 3121, 3143)
- Number of clicks per postcode
- Click-through rates (Postcode Click Ratio) as percentages

**Key insights:**
- **Postcode 3181** is the top performer with 240 clicks and highest click ratio at 26.55%
- **Postcode 3141** ranks second with 161 clicks and 17.81% click
![Postcode Clicks](UserProfileCampaigns/campaign-clicks-by-postcode.png)

#### campaigns
Widget showing campaign event types. Displayed as a Table.
```json
{
  "columnNames": [
    "Campaign",
    "Count"
  ],
  "keyAliases": {
    "c0": {
      "entity": "Campaign",
      "ids": [
        "9641",
        "9642",
        "9643"
      ]
    }
  },
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "campaignEventType"
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileCampaigns",
            "value": {
              "counter": "total"
            }
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": ""
    },
    "type": "Table",
    "title": "campaigns",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```

#### Profiles by Campaign x Event-Type
Count profiles that had an event on a campaign
```json
{
  "keyAliases": {
    "campaignEventType": [
      "BOUNCED",
      "CLICKED",
      "DELIVERED",
      "OPENED",
      "SPAM",
      "UNSUBSCRIBED"
    ]
  },
  "columnNames": [
    "Campaign",
    {
      "name": "event",
      "dimension": {
        "key": "campaignEventType"
      }
    }
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "campaign"
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileCampaigns",
            "value": {
              "counter": "total"
            }
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Count profiles that had an event on a campaign"
    },
    "type": "Table",
    "title": "Profiles by Campaign x Event-Type",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```


**Visualization Preview:** This is a data table visualization showing email campaign performance metrics across different marketing campaigns. 

**Data Displayed:**
- 12 different campaigns (mostly PRN and BPP branded)
- 6 key email metrics: Bounced, Clicked, Delivered, Opened, Spam, and Unsubscribed
- Performance data for each campaign-metric combination

**Key Insights:**
- **Delivery volumes vary significantly**: Ranges from ~3,000-4,000 (top campaigns) to ~8,000-10,000+ (bottom campaigns)
- **Click-through rates differ**: Some campaigns like "Pran Survey" show high clicks (170)
![Profiles by Campaign x Event-Type](UserProfileCampaigns/campaign-events-by-campaign.png)

#### Campaign Postcodes
Campaigns and postcodes of the registrations engaging with them
```json
{
  "columnNames": [
    "Campaign",
    "Postcode",
    "Count"
  ],
  "keyAliases": {
    "c0": {
      "entity": "Campaign",
      "ids": [
        "9641",
        "9642",
        "9643"
      ]
    }
  },
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "campaign"
          },
          "sortSpecification": {
            "ascending": true,
            "priority": 1
          }
        },
        {
          "dimension": {
            "key": "postcode"
          },
          "sortSpecification": {
            "ascending": true,
            "priority": 2
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileCampaigns",
            "value": {
              "counter": "total"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Campaigns and postcodes of the registrations engaging with them"
    },
    "type": "Table",
    "title": "Campaign Postcodes",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```

#### campaign events
Count campaign events
```json
{
  "keyAliases": {
    "c0": {
      "entity": "Campaign",
      "ids": [
        "9641",
        "9642",
        "9643"
      ]
    }
  },
  "columnNames": [
    "total"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "numericExpression": {
            "metric": "UserProfileCampaigns",
            "value": {
              "counter": "total"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Count campaign events"
    },
    "type": "Number",
    "title": "campaign events"
  }
}
```

#### Auto Triggered by Venue and Zone
Count the regos that triggered a campaign in a zone
```json
{
  "columnNames": [
    "Venue",
    "Zone",
    "Count"
  ],
  "keyAliases": {},
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "venueId"
          }
        },
        {
          "dimension": {
            "key": "zoneId",
            "missing": true
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileCampaigns",
            "value": {
              "counter": "total"
            }
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Count the regos that triggered a campaign in a zone"
    },
    "type": "Table",
    "title": "Auto Triggered by Venue and Zone",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```


**Visualization Preview:** This is a **data table visualization** from Beonic Insights showing "Auto Triggered by Venue and Zone" analytics.

**Data Structure:**
- Three columns: Venue, Zone, and Count
- All entries are from "Pran Central" venue
- Shows 8 different zones within the venue
- Count values range from 1 to 153

**Key Insights:**
- **Commercial Road Entry** is the most active zone with 153 triggers (59% of total activity)
- **Chapel Street - Laser Clinics** and **Foodcourt** are tied as secondary hotspots with 36 triggers each
- Several zones show minimal activity (
![Auto Triggered by Venue and Zone](UserProfileCampaigns/campaigns-by-venue-zone.png)

#### campaigns
Widget showing campaigns. Displayed as a Table.
```json
{
  "columnNames": [
    "Campaign",
    "Count"
  ],
  "keyAliases": {
    "c0": {
      "entity": "Campaign",
      "ids": [
        "9641",
        "9642",
        "9643"
      ]
    }
  },
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "campaign"
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileCampaigns",
            "value": {
              "counter": "total"
            }
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": ""
    },
    "type": "Table",
    "title": "campaigns",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```

#### Gender Composition
Percentages of Males and Females
```json
{
  "keyAliases": {
    "c0": {
      "entity": "Campaign",
      "ids": [
        "9641",
        "9642",
        "9643"
      ]
    }
  },
  "columnNames": [
    "gender",
    "percentage"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "gender"
          }
        },
        {
          "numericExpression": {
            "$divide": [
              {
                "metric": "UserProfileCampaigns",
                "value": {
                  "counter": "total"
                }
              },
              {
                "metric": "UserProfileCampaigns",
                "value": {
                  "counter": "total"
                },
                "aggregateAcross": [
                  {
                    "key": "gender"
                  }
                ]
              }
            ]
          },
          "unit": "percentage",
          "decimalPlaces": 2
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Percentages of Males and Females"
    },
    "type": "MultiNumber",
    "title": "Gender Composition"
  }
}
```


## UserProfileClicks
#### Campaign Clickers by Gender (postcodes 5000,5082,5085,5066,5067)
Shows clicks  broken down by campaign gender. Displayed as a Table.
```json
{
  "columnNames": [
    "Campaign",
    "Postcode",
    "Count"
  ],
  "keyAliases": {
    "postcode": [
      "5000",
      "5082",
      "5085",
      "5066",
      "5067"
    ]
  },
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "campaign"
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        },
        {
          "dimension": {
            "key": "gender"
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileClicks",
            "value": {
              "counter": "total"
            }
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 2
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": ""
    },
    "type": "Table",
    "title": "Campaign Clickers by Gender (postcodes 5000,5082,5085,5066,5067)",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```


**Visualization Preview:** This is a **data table visualization** showing campaign performance metrics broken down by gender demographics.

**Data Displayed:**
- Campaign names (Winter Warmers, WIN Designer or Diamonds, Vogue Festival 2021, School Holidays Sept21)
- Gender segments (Female/Male)
- Click counts for specific postcodes (5000, 5082, 5085, 5066, 5067)

**Key Insights:**
- **Strong female skew**: All campaigns show significantly higher female engagement, with females generating 14-18 clicks per campaign compared to only 1 click from males
- **Consistent pattern**: The gender disparity is remarkably consistent across all
![Campaign Clickers by Gender (postcodes 5000,5082,5085,5066,5067)](UserProfileClicks/clicks-by-campaign-gender.png)

#### Campaign Clicks
Shows clicks  broken down by campaign. Displayed as a Table.
```json
{
  "columnNames": [
    "Campaign",
    "Count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "campaign"
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileClicks",
            "value": {
              "counter": "total"
            }
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": ""
    },
    "type": "Table",
    "title": "Campaign Clicks",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```


**Visualization Preview:** This is a tabular data visualization showing "Campaign Clicks" performance metrics. It displays a two-column table with:

**Structure:**
- Left column: Campaign names (sortable, indicated by up arrow)
- Right column: Click counts (sortable, indicated by up/down arrows)

**Data displayed:**
Seven different ACP (brand) campaigns with their respective click counts, ranging from 3,289 to 5,426 clicks.

**Key insights:**
- "ACP - Equestrian" is the top performer with 5,426 clicks
- "ACP - JAN25 FOOD" follows closely with 4,520 clicks
- Performance
![Campaign Clicks](UserProfileClicks/clicks-by-campaign.png)

#### Auto Campaign Clicks by PageType
Shows clicks  broken down by pageType. Displayed as a Table.
```json
{
  "columnNames": [
    "Venue",
    "Count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "pageType"
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileClicks",
            "value": {
              "counter": "total"
            }
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": ""
    },
    "type": "Table",
    "title": "Auto Campaign Clicks by PageType",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```

#### Clicks by Portal
Shows clicks  broken down by portal. Displayed as a Table.
```json
{
  "columnNames": [
    "Portal",
    "Count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "portal"
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileClicks",
            "value": {
              "counter": "total"
            }
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": ""
    },
    "type": "Table",
    "title": "Clicks by Portal",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```

#### Clicks by URL
Shows clicks  broken down by url. Displayed as a Table.
```json
{
  "columnNames": [
    "URL",
    "Count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "url"
          },
          "sortSpecification": {
            "ascending": true,
            "priority": 1
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileClicks",
            "value": {
              "counter": "total"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": ""
    },
    "type": "Table",
    "title": "Clicks by URL",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```


**Visualization Preview:** This is a **table visualization** showing "Clicks by URL" data from Beonic Insights. 

**Data Display:**
- Lists URLs in the left column with corresponding click counts in the right column
- Shows 16 different URLs with click counts ranging from 3 to 5,602
- Data is sortable by both URL and Count columns (indicated by sort arrows)

**Key Insights:**
- **Top performers:** The main Adelaide Central Plaza website with UTM parameters leads with 5,602 clicks, followed by the Apple App Store link (1,486 clicks) and Google Play Store link (1,004 clicks)
- **Traffic sources:** Mix of website pages
![Clicks by URL](UserProfileClicks/clicks-by-url.png)

#### Auto Campaign Clicks by Venue
Shows clicks  broken down by venue. Displayed as a Table.
```json
{
  "columnNames": [
    "Venue",
    "Count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "venueId"
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileClicks",
            "value": {
              "counter": "total"
            }
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": ""
    },
    "type": "Table",
    "title": "Auto Campaign Clicks by Venue",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```


## UserProfileVisits
### Histograms
#### Visit Duration (minutes) Histogram Bar Chart
Creates a histogram of user visit durations. The histogram's duration buckets and counts are visualised as a bar chart. The buckets are default dwell times for visits and sessions.
```json
{
  "columnNames": [
    "visit duration",
    "count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "histogram": {
              "metric": "UserProfileVisits",
              "histogram": "duration"
            }
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileVisits",
            "value": {
              "histogram": "duration"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Creates a histogram of user visit durations. The histogram's duration buckets and counts are visualised as a bar chart. The buckets are default dwell times for visits and sessions."
    },
    "type": "BarChart",
    "title": "Visit Duration (minutes) Histogram Bar Chart",
    "barChartSettings": {
      "showBarValues": false,
      "columnSettings": {
        "Total Visits": {
          "axis": "left",
          "type": null,
          "showOnChart": true,
          "showOnTooltip": true
        }
      },
      "tooltip": {
        "show": true
      },
      "layout": "vertical",
      "xAxis": {
        "axisLine": {
          "show": false
        },
        "inverse": false,
        "showName": false,
        "splitNumber": 5
      },
      "gridLines": "auto",
      "timeseriesResolutions": false,
      "enableChartSwitching": false,
      "yAxis": {
        "axisLine": {
          "show": false
        },
        "inverse": false,
        "showName": false,
        "splitNumber": 5
      },
      "showLegend": true,
      "hideAxis": false,
      "stackType": "no-stack"
    }
  }
}
```


**Visualization Preview:** This is a histogram bar chart showing the distribution of website visit durations in minutes. 

**Chart Type:** Histogram with discrete time interval bins on the x-axis and visitor count on the y-axis.

**Data Displayed:** 
- Visit duration ranges from 0-5 minutes up to 301+ minutes
- Visitor counts ranging from 0 to approximately 40,000
- Seven distinct time intervals as bins

**Key Insights:**
- **Peak engagement occurs in medium-duration visits:** The highest counts are in the 61-120 minute range (~37k visitors), followed closely by 31-60 minutes (~35k visitors)
- **Strong mid-range
![Visit Duration (minutes) Histogram Bar Chart](UserProfileVisits/histograms/visits-histogram-duration-barChart.png)

#### Visit Time of Day Histogram Line Chart
Creates a histogram of user visits by time of day. The histogram's hour of day buckets and counts are visualised as a line chart. The default buckets are the hours of the day.
```json
{
  "columnNames": [
    "hour",
    "visits"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "histogram": {
              "metric": "UserProfileVisits",
              "histogram": "hourAndMinuteOfDay"
            }
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileVisits",
            "value": {
              "histogram": "hourAndMinuteOfDay"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Creates a histogram of user visits by time of day. The histogram's hour of day buckets and counts are visualised as a line chart. The default buckets are the hours of the day."
    },
    "type": "LineChart",
    "title": "Visit Time of Day Histogram Line Chart",
    "lineChartSettings": {
      "showLegend": true,
      "hideAxis": false,
      "gridLines": "auto",
      "stackType": "no-stack",
      "xAxis": {
        "axisLine": {
          "show": false
        },
        "inverse": false,
        "showName": false,
        "splitNumber": 5
      },
      "yAxis": {
        "axisLine": {
          "show": false
        },
        "inverse": false,
        "showName": false,
        "splitNumber": 5
      },
      "enableChartSwitching": false,
      "timeseriesResolutions": false,
      "columnSettings": {},
      "tooltip": {
        "show": true
      }
    }
  }
}
```


**Visualization Preview:** This is a line chart showing website visits over time periods. The visualization displays:

**Chart Type:** Single-line graph with a blue line tracking visits across time intervals

**Data Displayed:** 
- Y-axis: Number of visits (ranging from 0 to 7.0k)
- X-axis: Time periods in ranges (0-100, 400-500, 800-900, etc. up to 2000-2100)

**Key Insights:**
- **Peak Performance:** Visits reach their highest point around the 1500-1600 time period at approximately 6.5k visits
- **Growth Pattern:** Sharp increase starting around the 800-
![Visit Time of Day Histogram Line Chart](UserProfileVisits/histograms/visits-histogram-hourAndMinuteOfDay-lineChart.png)

#### Primary Zone Visit Duration (minutes) Histogram Bar Chart
Creates a histogram of user visits to the primary zone, visualised as a bar chart. The histogram's duration buckets and counts are displayed in the chart. The buckets are the default dwell times for visits and sessions.
```json
{
  "columnNames": [
    "primary zone visit duration",
    "count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "histogram": {
              "metric": "UserProfileVisits",
              "histogram": "primaryZoneDuration"
            }
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileVisits",
            "value": {
              "histogram": "primaryZoneDuration"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Creates a histogram of user visits to the primary zone, visualised as a bar chart. The histogram's duration buckets and counts are displayed in the chart. The buckets are the default dwell times for visits and sessions."
    },
    "type": "BarChart",
    "title": "Primary Zone Visit Duration (minutes) Histogram Bar Chart",
    "barChartSettings": {
      "showBarValues": false,
      "columnSettings": {
        "Total Visits": {
          "axis": "left",
          "type": null,
          "showOnChart": true,
          "showOnTooltip": true
        }
      },
      "tooltip": {
        "show": true
      },
      "layout": "vertical",
      "xAxis": {
        "axisLine": {
          "show": false
        },
        "inverse": false,
        "showName": false,
        "splitNumber": 5
      },
      "gridLines": "auto",
      "timeseriesResolutions": false,
      "enableChartSwitching": false,
      "yAxis": {
        "axisLine": {
          "show": false
        },
        "inverse": false,
        "showName": false,
        "splitNumber": 5
      },
      "showLegend": true,
      "hideAxis": false,
      "stackType": "no-stack"
    }
  }
}
```


**Visualization Preview:** This is a histogram bar chart showing the distribution of Primary Zone Visit Duration in minutes. 

**Chart Type:** Histogram with discrete time interval bins on the x-axis and frequency counts on the y-axis.

**Data Displayed:** 
- Visit duration ranges from 0-5 minutes up to 301+ minutes
- Count values ranging from approximately 1.5k to 12k visits per time interval

**Key Insights:**
- **Peak activity:** The highest frequency occurs in the 6-15 minute range (~12k visits)
- **Right-skewed distribution:** Most visits are concentrated in shorter durations (6-60 minutes)
- **Rapid decline:**
![Primary Zone Visit Duration (minutes) Histogram Bar Chart](UserProfileVisits/histograms/visits-histogram-primaryZoneDuration-barChart.png)


### Main Widgets
#### Gender Visitors
Count visits to a venue by visitor's gender
```json
{
  "columnNames": [
    "Venue",
    {
      "name": "gender",
      "dimension": {
        "key": "gender",
        "missing": true
      }
    }
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "venueId"
          },
          "sortSpecification": {
            "ascending": true,
            "priority": 1
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileVisits",
            "value": {
              "counter": "total"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Count visits to a venue by visitor's gender"
    },
    "type": "Table",
    "title": "Gender Visitors",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```


**Visualization Preview:** This is a data table visualization showing gender visitor demographics across two venues. The table displays visitor counts broken down by three gender categories (Female, Male, and Other) for Chevron Renaissance and MacArthur Central.

**Key insights:**
- **Chevron Renaissance** has more balanced gender distribution with slightly more male visitors (70,143) than female (65,511), and minimal "Other" category visitors (143)
- **MacArthur Central** shows a similar pattern but with lower overall traffic - 63,645 male and 57,107 female visitors, but notably higher "Other" category representation (4,682)
- Both venues attract slightly more male than female visitors
-
![Gender Visitors](UserProfileVisits/visits-by-gender-columns.png)

#### visits
Count visits to a venue by visitor's postcode (only top 5 South Australia postcodes)
```json
{
  "columnNames": [
    "Venue",
    "postcode",
    "Count"
  ],
  "keyAliases": {
    "postcode": [
      "5000",
      "5006",
      "5009",
      "5011",
      "5013",
      "5031",
      "5033",
      "5034",
      "5045",
      "5082",
      "5085",
      "5065",
      "5066",
      "5067",
      "5069",
      "5074",
      "5081",
      "5082",
      "5089"
    ]
  },
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "venueId"
          },
          "sortSpecification": {
            "ascending": true,
            "priority": 1
          }
        },
        {
          "dimension": {
            "key": "postcode"
          },
          "sortSpecification": {
            "ascending": true,
            "priority": 2
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileVisits",
            "value": {
              "counter": "total"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Count visits to a venue by visitor's postcode (only top 5 South Australia postcodes)"
    },
    "type": "Table",
    "title": "visits",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```


**Visualization Preview:** This is a **data table visualization** showing website visit statistics for two shopping venues in Adelaide, Australia.

**Data displayed:**
- **Venues:** Adelaide Central Plaza and Port Adelaide Plaza
- **Postcodes:** Various codes (5000, 5066, 5067, 5082, 5085)
- **Visit counts:** Ranging from 33 to 28,858 visits

**Key insights:**
- Adelaide Central Plaza significantly outperforms Port Adelaide Plaza in visitor traffic
- Postcode 5000 generates the highest traffic for Adelaide Central Plaza (28,858 visits) but much lower for Port Adelaide Plaza (1,109 visits)
- Adelaide Central Plaza
![visits](UserProfileVisits/visits-by-venue-postcode.png)

#### Postcode Numeric Histogram Table (inline buckets)
Creates a histogram of user postcodes. The histogram's postcode buckets and counts are visualised as a table. The buckets are defined using inline buckets, covering various regions in South Australia and Victoria.
```json
{
  "columnNames": [
    "postcodeNumeric",
    "count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "sortSpecification": {
            "ascending": true,
            "priority": 1
          },
          "dimension": {
            "histogram": {
              "buckets": [
                {
                  "key": "SA - Adelaide Metro (5000-5099)",
                  "from": 5000,
                  "to": 5099
                },
                {
                  "key": "SA - Adelaide Hills/Eastern (5100-5199)",
                  "from": 5100,
                  "to": 5199
                },
                {
                  "key": "SA - Southern Adelaide (5200-5299)",
                  "from": 5200,
                  "to": 5299
                },
                {
                  "key": "SA - Barossa/Northern (5300-5399)",
                  "from": 5300,
                  "to": 5399
                },
                {
                  "key": "SA - Riverland/Murray (5400-5499)",
                  "from": 5400,
                  "to": 5499
                },
                {
                  "key": "SA - Mid North/Yorke Peninsula (5500-5599)",
                  "from": 5500,
                  "to": 5599
                },
                {
                  "key": "SA - Eyre Peninsula/West Coast (5600-5699)",
                  "from": 5600,
                  "to": 5699
                },
                {
                  "key": "SA - Far North/Outback (5700-5799)",
                  "from": 5700,
                  "to": 5799
                }
              ]
            }
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "histogram": "postcodeNumeric"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Creates a histogram of user postcodes. The histogram's postcode buckets and counts are visualised as a table. The buckets are defined using inline buckets, covering various regions in South Australia and Victoria."
    },
    "type": "Table",
    "title": "Postcode Numeric Histogram Table (inline buckets)",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```


**Visualization Preview:** This is a **data table visualization** showing "Primary Zone Visits" with three columns:

- **Venue**: Lists shopping centers (Adelaide Central Plaza and Port Adelaide Plaza)
- **Primary Zone**: Specifies different areas/zones within each venue
- **Count**: Shows visit numbers ranging from ~14K to ~18K

**Key insights:**
- Adelaide Central Plaza dominates with 4 of the top 5 zones
- "Cue" zone has the highest traffic (18,497 visits)
- "Level 1" follows closely (17,378 visits)
- Port Adelaide Plaza appears twice with "Casual Dining/external" (16,726) an
![Postcode Numeric Histogram Table (inline buckets)](UserProfileVisits/visits-by-venue-zone.png)

#### visits
Shows visits  broken down by venue. Displayed as a Table.
```json
{
  "columnNames": [
    "Venue",
    "Count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "venueId"
          },
          "sortSpecification": {
            "ascending": true,
            "priority": 1
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileVisits",
            "value": {
              "counter": "total"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": ""
    },
    "type": "Table",
    "title": "visits",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```


**Visualization Preview:** This is a simple data table visualization showing visit counts by venue. The table displays two locations:

- **Adelaide Central Plaza**: 180,566 visits
- **Port Adelaide Plaza**: 61,005 visits

**Key insights:**
- Adelaide Central Plaza receives nearly 3 times more visits than Port Adelaide Plaza
- The significant disparity (119,561 visit difference) suggests Adelaide Central Plaza is likely a more prominent or accessible location
- This appears to be comparative foot traffic data, useful for understanding venue performance or customer flow patterns

The visualization uses a clean, minimalist table format with clear column headers ("Venue" and "Count") and precise numerical data presentation.
![visits](UserProfileVisits/visits-by-venue.png)

#### Primary Zone Visits
Zone visit counts
```json
{
  "columnNames": [
    "Primary Zone",
    "Count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "zoneId",
            "missing": true
          },
          "sortSpecification": {
            "ascending": true,
            "priority": 1
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileVisits",
            "value": {
              "counter": "total"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Zone visit counts"
    },
    "type": "Table",
    "title": "Primary Zone Visits",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```


**Visualization Preview:** This is a data table visualization showing "Primary Zone Visits" with two columns: "Primary Zone" and "Count".

**Data displayed:**
- 7 different primary zones with their corresponding visit counts
- Visit counts range from 1,519 (PAP Reject Mall) to 16,730 (Casual Dining/external)
- Total dataset appears to cover 61,003 visits across all zones

**Key insights:**
- **Casual Dining/external** has the highest traffic (16,730 visits)
- **Aldi/Services/internal** is second highest (14,380 visits)
- There's a significant portion of **MISSING**
![Primary Zone Visits](UserProfileVisits/visits-by-zone-missing.png)

#### Primary Zone Visits
Zone visit counts
```json
{
  "columnNames": [
    "Primary Zone",
    "Count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "zoneId"
          },
          "sortSpecification": {
            "ascending": true,
            "priority": 1
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileVisits",
            "value": {
              "counter": "total"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Zone visit counts"
    },
    "type": "Table",
    "title": "Primary Zone Visits",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```


**Visualization Preview:** This is a **table visualization** showing "Primary Zone Visits" data. 

**Data displayed:**
- Lists 6 different primary zones/locations with their corresponding visit counts
- Zones include retail locations (Aldi, Casual Dining) and mall areas (PAP Big W Centre Court, PAP Coles Food Mall, PAP Fashion Mall, PAP Reject Mall)
- Visit counts range from 1,523 to 16,726

**Key insights:**
- **Casual Dining/external** has the highest traffic (16,726 visits)
- **Aldi/Services/internal** is the second most visited (14,370 visits)
![Primary Zone Visits](UserProfileVisits/visits-by-zone.png)


## UserProfileWiFiSessions
### Histograms
#### WiFi Session Data Usage (MB) Histogram Bar Chart
Creates a histogram of user WiFi session dataUsage, visualised as a bar chart. The histogram's data usage buckets and counts are displayed in the chart. The buckets are the default dwell times for visits and sessions.
```json
{
  "columnNames": [
    "session data usage",
    "sessions"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "histogram": {
              "metric": "UserProfileWiFiSessions",
              "histogram": "dataUsage"
            }
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileWiFiSessions",
            "value": {
              "histogram": "dataUsage"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Creates a histogram of user WiFi session dataUsage, visualised as a bar chart. The histogram's data usage buckets and counts are displayed in the chart. The buckets are the default dwell times for visits and sessions."
    },
    "type": "BarChart",
    "title": "WiFi Session Data Usage (MB) Histogram Bar Chart",
    "barChartSettings": {
      "showBarValues": false,
      "columnSettings": {
        "Total Visits": {
          "axis": "left",
          "type": null,
          "showOnChart": true,
          "showOnTooltip": true
        }
      },
      "tooltip": {
        "show": true
      },
      "layout": "vertical",
      "xAxis": {
        "axisLine": {
          "show": false
        },
        "inverse": false,
        "showName": false,
        "splitNumber": 5
      },
      "gridLines": "auto",
      "timeseriesResolutions": false,
      "enableChartSwitching": false,
      "yAxis": {
        "axisLine": {
          "show": false
        },
        "inverse": false,
        "showName": false,
        "splitNumber": 5
      },
      "showLegend": true,
      "hideAxis": false,
      "stackType": "no-stack"
    }
  }
}
```


**Visualization Preview:** This is a histogram bar chart displaying WiFi session data usage distribution measured in megabytes (MB). 

**Chart Type:** Histogram with vertical bars showing frequency distribution across data usage ranges.

**Data Displayed:** 
- X-axis: Data usage ranges in MB (0-4, 5-9, 10-19, 20-39, 40-79, 80-159, 160-319, 320-639, 640-1279, 1280+ MB)
- Y-axis: Number of sessions (ranging from 0 to 21k)

**Key Insights:**
- **Highest usage:** The 0-4 MB
![WiFi Session Data Usage (MB) Histogram Bar Chart](UserProfileWiFiSessions/histograms/wifiSessions-histogram-dataUsage-barChart.png)

#### WiFi Session Duration (minutes) Histogram Bar Chart
Creates a histogram of user WiFi session durations, visualised as a bar chart. The histogram's duration buckets and counts are displayed in the chart. The buckets are the default dwell times for visits and sessions.
```json
{
  "columnNames": [
    "session duration",
    "sessions"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "histogram": {
              "metric": "UserProfileWiFiSessions",
              "histogram": "duration"
            }
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileWiFiSessions",
            "value": {
              "histogram": "duration"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Creates a histogram of user WiFi session durations, visualised as a bar chart. The histogram's duration buckets and counts are displayed in the chart. The buckets are the default dwell times for visits and sessions."
    },
    "type": "BarChart",
    "title": "WiFi Session Duration (minutes) Histogram Bar Chart",
    "barChartSettings": {
      "showBarValues": false,
      "columnSettings": {
        "Total Visits": {
          "axis": "left",
          "type": null,
          "showOnChart": true,
          "showOnTooltip": true
        }
      },
      "tooltip": {
        "show": true
      },
      "layout": "vertical",
      "xAxis": {
        "axisLine": {
          "show": false
        },
        "inverse": false,
        "showName": false,
        "splitNumber": 5
      },
      "gridLines": "auto",
      "timeseriesResolutions": false,
      "enableChartSwitching": false,
      "yAxis": {
        "axisLine": {
          "show": false
        },
        "inverse": false,
        "showName": false,
        "splitNumber": 5
      },
      "showLegend": true,
      "hideAxis": false,
      "stackType": "no-stack"
    }
  }
}
```


**Visualization Preview:** This is a histogram bar chart displaying WiFi session duration data across different time intervals measured in minutes.

**Chart Type**: Histogram with 8 duration bins ranging from 0-5 minutes to 301+ minutes

**Data Displayed**: 
- X-axis: Session duration intervals (0-5, 6-15, 16-30, 31-60, 61-120, 121-180, 181-300, 301+ minutes)
- Y-axis: Number of sessions (ranging from 0 to 30k)

**Key Insights**:
- **Peak usage**: The 16-30 minute range has the highest frequency (~27k
![WiFi Session Duration (minutes) Histogram Bar Chart](UserProfileWiFiSessions/histograms/wifiSessions-histogram-duration-barChart.png)

#### WiFi Session Time of Day Histogram Line Chart
Creates a histogram of user WiFi Sessions by time of day. The histogram's hour of day buckets and counts are visualised as a line chart. The default buckets are the hours of the day.
```json
{
  "columnNames": [
    "hour",
    "sessions"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "histogram": {
              "metric": "UserProfileWiFiSessions",
              "histogram": "hourAndMinuteOfDay"
            }
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileWiFiSessions",
            "value": {
              "histogram": "hourAndMinuteOfDay"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Creates a histogram of user WiFi Sessions by time of day. The histogram's hour of day buckets and counts are visualised as a line chart. The default buckets are the hours of the day."
    },
    "type": "LineChart",
    "title": "WiFi Session Time of Day Histogram Line Chart",
    "lineChartSettings": {
      "showLegend": true,
      "hideAxis": false,
      "gridLines": "auto",
      "stackType": "no-stack",
      "xAxis": {
        "axisLine": {
          "show": false
        },
        "inverse": false,
        "showName": false,
        "splitNumber": 5
      },
      "yAxis": {
        "axisLine": {
          "show": false
        },
        "inverse": false,
        "showName": false,
        "splitNumber": 5
      },
      "enableChartSwitching": false,
      "timeseriesResolutions": false,
      "columnSettings": {},
      "tooltip": {
        "show": true
      }
    }
  }
}
```


**Visualization Preview:** This is a line chart displaying WiFi session activity throughout the day, organized as a histogram showing time-of-day patterns.

**Chart Type:** Line chart with histogram-style time bins

**Data Displayed:** 
- X-axis: Time periods in 100-minute intervals (0-100, 300-400, etc., up to 2100-2200)
- Y-axis: Number of WiFi sessions (ranging from 0 to 15k)
- Single blue line tracking session volume across different time periods

**Key Insights:**
- **Peak usage period:** Sessions peak between 1200-1600 (noon to 4 PM), reaching approximately 14
![WiFi Session Time of Day Histogram Line Chart](UserProfileWiFiSessions/histograms/wifiSessions-histogram-hourAndMinuteOfDay-lineChart.png)


### Main Widgets
#### OS Category (Android & Apple)
OS categories
```json
{
  "columnNames": [
    "Venue",
    {
      "name": "osCategory",
      "dimension": {
        "key": "osCategory"
      }
    }
  ],
  "keyAliases": {
    "osCategory": [
      "Android",
      "IOS_OSX"
    ]
  },
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "venueId"
          },
          "sortSpecification": {
            "ascending": true,
            "priority": 1
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileWiFiSessions",
            "value": {
              "counter": "total"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "OS categories"
    },
    "type": "Table",
    "title": "OS Category (Android & Apple)",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```


**Visualization Preview:** This is a pivot table visualization showing OS category data (Android vs iOS/OSX) broken down by venue location.

**Data displayed:**
- Two venues: Chevron Renaissance and MacArthur Central
- Two OS categories: Android and iOS_OSX
- Numerical values representing user counts or device detections

**Key insights:**
- **Chevron Renaissance**: iOS/OSX users significantly outnumber Android users (64,783 vs 45,665)
- **MacArthur Central**: Android users outnumber iOS/OSX users (68,913 vs 55,930)
- The venues show opposite patterns in OS preference, suggesting different demographic profiles or customer
![OS Category (Android & Apple)](UserProfileWiFiSessions/sessions-by-venue-os-categories.png)

#### Sessions
Shows sessions  broken down by venue. Displayed as a Table.
```json
{
  "columnNames": [
    "Venue",
    "Count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "venueId"
          },
          "sortSpecification": {
            "ascending": true,
            "priority": 1
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfileWiFiSessions",
            "value": {
              "counter": "total"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": ""
    },
    "type": "Table",
    "title": "Sessions",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```


**Visualization Preview:** This is a simple table visualization from Beonic Insights showing session data by venue. 

**Chart Type:** Data table with two columns

**Data Displayed:**
- Venue names (Adelaide Central Plaza, Port Adelaide Plaza)
- Session counts for each venue

**Key Insights:**
- Adelaide Central Plaza leads with 121,839 sessions
- Port Adelaide Plaza has 114,012 sessions
- The difference between venues is relatively small (~7,800 sessions or about 6.4%)
- Both venues show strong session volumes, suggesting active user engagement

The visualization uses a clean, minimalist design with sortable columns (indicated by the sort arrows), making it easy to compare performance between
![Sessions](UserProfileWiFiSessions/sessions-by-venue.png)


## UserProfilesNow
### Histograms
#### Age In Years Histogram Table (default buckets)
Creates a histogram of user ages.  The histogram's age buckets and counts are visualised as a table. The buckets are defaults derived from the histogram's metric and the histogram name.
```json
{
  "columnNames": [
    "ageInYears",
    "count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "histogram": {
              "metric": "UserProfilesNow",
              "histogram": "ageInYears"
            }
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "histogram": "ageInYears"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Creates a histogram of user ages.  The histogram's age buckets and counts are visualised as a table. The buckets are defaults derived from the histogram's metric and the histogram name."
    },
    "type": "Table",
    "title": "Age In Years Histogram Table (default buckets)",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```


**Visualization Preview:** This is a histogram table showing age distribution data organized into inline buckets. 

**Visualization Type:** Frequency table/histogram in tabular format

**Data Displayed:** 
- Age ranges in 10-year intervals from 0-14 up to 75+
- Count of individuals in each age bracket
- Total sample size of 6,690 people

**Key Insights:**
- **Peak demographic:** Ages 25-34 with 2,589 individuals (highest frequency)
- **Distribution pattern:** Shows a typical population pyramid with higher concentrations in younger-middle age groups
- **Age gaps:** No individuals in the 0-14 age range, suggesting this
![Age In Years Histogram Table (default buckets)](UserProfilesNow/histograms/histogram-ageInYears-defaultBuckets-table.png)

#### Age In Years Histogram Table (inline buckets)
Creates a histogram of user ages. The histogram's age buckets and counts are visualised as a table. The buckets are defined using inline buckets. The first bucket is for ages up to 20, the second bucket is for ages from 20 to 40, and the third bucket is for ages over 40.
```json
{
  "columnNames": [
    "ageInYears",
    "count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "histogram": {
              "buckets": [
                {
                  "to": 20
                },
                {
                  "from": 20,
                  "to": 40
                },
                {
                  "from": 40
                }
              ]
            }
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "histogram": "ageInYears"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Creates a histogram of user ages. The histogram's age buckets and counts are visualised as a table. The buckets are defined using inline buckets. The first bucket is for ages up to 20, the second bucket is for ages from 20 to 40, and the third bucket is for ages over 40."
    },
    "type": "Table",
    "title": "Age In Years Histogram Table (inline buckets)"
  }
}
```


**Visualization Preview:** This is a **histogram frequency table** showing the distribution of ages across three age groups.

**Data Display:**
- **0-20 years:** 266 people
- **20-40 years:** 4,812 people  
- **40+ years:** 2,377 people
- **Total sample size:** 7,455 people

**Key Insights:**
- The **20-40 age group dominates** the dataset, representing about 65% of the population
- There's a **significant underrepresentation** of younger people (0-20), making up only 3.6% of the sample
- The distribution shows a **middle-age sk
![Age In Years Histogram Table (inline buckets)](UserProfilesNow/histograms/histogram-ageInYears-inlineBuckets-table.png)

#### 20 to 40 Years Old Count
Count of users aged between 20 and 40 years old.  This uses an inline bucket for the age range. The count is visualised as a number.
```json
{
  "columnNames": [
    "20 to 40"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "histogram": "ageInYears",
              "bucket": {
                "from": 20,
                "to": 40
              }
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Count of users aged between 20 and 40 years old.  This uses an inline bucket for the age range. The count is visualised as a number."
    },
    "type": "Number",
    "title": "20 to 40 Years Old Count"
  }
}
```


**Visualization Preview:** This is a simple metric card or KPI widget displaying a single data point. 

**Visualization Type:** Numeric display card/metric widget

**Data Displayed:** A count of 4,812 people in the 20 to 40 years old age demographic

**Visual Elements:** 
- Clean, minimalist design with white background
- Large, prominent number (4,812) as the focal point
- Descriptive header text identifying the metric
- Simple border/container styling

**Insights Provided:** This widget provides a quick snapshot of the population size within a specific age range (20-40 years), likely part of a larger demographic analysis dashboard. The large, clear presentation makes
![20 to 40 Years Old Count](UserProfilesNow/histograms/histogram-ageInYears-singleBucket-number.png)

#### Country Calling Code Histogram Table (default buckets)
Creates a histogram of user country calling codes. The histogram's country calling code buckets and counts are visualised as a table.
```json
{
  "columnNames": [
    "countryCallingCodeNumeric",
    "count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "histogram": {
              "metric": "UserProfilesNow",
              "histogram": "countryCallingCodeNumeric"
            }
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "histogram": "countryCallingCodeNumeric"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Creates a histogram of user country calling codes. The histogram's country calling code buckets and counts are visualised as a table."
    },
    "type": "Table",
    "title": "Country Calling Code Histogram Table (default buckets)",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```


**Visualization Preview:** This is a **histogram table** that displays the distribution of country calling codes in numeric ranges.

**Data Display:**
- Shows 7 different ranges of country calling codes (e.g., 1-1, 20-29, 30-49, etc.)
- Each range shows the count of calling codes within that bucket
- Total dataset contains 70,922 entries

**Key Insights:**
- **Heavily concentrated distribution**: The 60-99 range dominates with 68,863 entries (~97% of all data)
- **Most other ranges are sparsely populated**: Several ranges have very low counts (1-1 has 0, 200-299
![Country Calling Code Histogram Table (default buckets)](UserProfilesNow/histograms/histogram-countryCallingCode-table.png)

#### Signup Hour Histogram
Creates a histogram of user signup times by hour of the day. The histogram's hour buckets and counts are visualised as a bar chart. The buckets are hour-of-day defaults, derived from the histogram's metric and the histogram name.
```json
{
  "columnNames": [
    "Hour of Day",
    "Count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "histogram": {
              "metric": "UserProfilesNow",
              "histogram": "hourAndMinuteOfDay"
            }
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "histogram": "hourAndMinuteOfDay"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "imageFile": "",
    "description": {
      "html": "Creates a histogram of user signup times by hour of the day. The histogram's hour buckets and counts are visualised as a bar chart. The buckets are hour-of-day defaults, derived from the histogram's metric and the histogram name."
    },
    "barChartSettings": {
      "showBarValues": false,
      "columnSettings": {
        "Total Visits": {
          "axis": "left",
          "type": null,
          "showOnChart": true,
          "showOnTooltip": true
        }
      },
      "tooltip": {
        "show": true
      },
      "layout": "vertical",
      "xAxis": {
        "axisLine": {
          "show": false
        },
        "inverse": false,
        "showName": false,
        "splitNumber": 5
      },
      "gridLines": "auto",
      "timeseriesResolutions": false,
      "enableChartSwitching": false,
      "yAxis": {
        "axisLine": {
          "show": false
        },
        "inverse": false,
        "showName": false,
        "splitNumber": 5
      },
      "showLegend": true,
      "hideAxis": false,
      "stackType": "no-stack"
    },
    "title": "Signup Hour Histogram",
    "type": "BarChart"
  }
}
```


**Visualization Preview:** This is a histogram showing the distribution of signup hours throughout the day (displayed in 24-hour format on the x-axis). 

**Chart Type:** Bar histogram with blue bars representing count frequency

**Data Displayed:** 
- X-axis: Time ranges in 100-hour intervals (0-100, 300-400, etc. up to 2100-2200)
- Y-axis: Count of signups (ranging from 0 to 21k)

**Key Insights:**
- **Peak signup period:** 1300-1400 hours (1-2 PM) with nearly 20k signups
- **High activity window:** 1200-
![Signup Hour Histogram](UserProfilesNow/histograms/histogram-hourAndMinuteOfDay-defaultBuckets-barChart.png)

#### Postcode Numeric Histogram Table (inline buckets)
Creates a histogram of user postcodes. The histogram's postcode buckets and counts are visualised as a table. The buckets are defined using inline buckets, covering various regions in South Australia and Victoria.
```json
{
  "columnNames": [
    "postcodeNumeric",
    "count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "histogram": {
              "buckets": [
                {
                  "key": "SA - Adelaide Metro (5000-5099)",
                  "from": 5000,
                  "to": 5099
                },
                {
                  "key": "SA - Adelaide Hills/Eastern (5100-5199)",
                  "from": 5100,
                  "to": 5199
                },
                {
                  "key": "SA - Southern Adelaide (5200-5299)",
                  "from": 5200,
                  "to": 5299
                },
                {
                  "key": "SA - Barossa/Northern (5300-5399)",
                  "from": 5300,
                  "to": 5399
                },
                {
                  "key": "SA - Riverland/Murray (5400-5499)",
                  "from": 5400,
                  "to": 5499
                },
                {
                  "key": "SA - Mid North/Yorke Peninsula (5500-5599)",
                  "from": 5500,
                  "to": 5599
                },
                {
                  "key": "SA - Eyre Peninsula/West Coast (5600-5699)",
                  "from": 5600,
                  "to": 5699
                },
                {
                  "key": "SA - Far North/Outback (5700-5799)",
                  "from": 5700,
                  "to": 5799
                },
                {
                  "key": "VIC - Melbourne CBD/Inner (3000-3099)",
                  "from": 3000,
                  "to": 3099
                },
                {
                  "key": "VIC - Melbourne Eastern (3100-3199)",
                  "from": 3100,
                  "to": 3199
                },
                {
                  "key": "VIC - Melbourne Western (3200-3299)",
                  "from": 3200,
                  "to": 3299
                },
                {
                  "key": "VIC - Melbourne Northern (3300-3399)",
                  "from": 3300,
                  "to": 3399
                },
                {
                  "key": "VIC - Geelong/Western Districts (3400-3499)",
                  "from": 3400,
                  "to": 3499
                },
                {
                  "key": "VIC - Central Highlands/Ballarat (3500-3599)",
                  "from": 3500,
                  "to": 3599
                },
                {
                  "key": "VIC - Gippsland/Eastern (3600-3699)",
                  "from": 3600,
                  "to": 3699
                },
                {
                  "key": "VIC - Murray River/North (3700-3799)",
                  "from": 3700,
                  "to": 3799
                },
                {
                  "key": "VIC - Wimmera/Mallee (3800-3899)",
                  "from": 3800,
                  "to": 3899
                },
                {
                  "key": "VIC - Far East/Alpine (3900-3999)",
                  "from": 3900,
                  "to": 3999
                },
                {
                  "key": "VIC - Special Addresses (8000-8999)",
                  "from": 8000,
                  "to": 8999
                }
              ]
            }
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "histogram": "postcodeNumeric"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Creates a histogram of user postcodes. The histogram's postcode buckets and counts are visualised as a table. The buckets are defined using inline buckets, covering various regions in South Australia and Victoria."
    },
    "type": "Table",
    "title": "Postcode Numeric Histogram Table (inline buckets)",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```


**Visualization Preview:** This is a **frequency distribution table** (histogram table) showing postcode data organized into numeric ranges.

**Data displayed:**
- Postcode ranges from 5000-5699 grouped into 100-unit buckets
- Count of occurrences for each postcode range

**Key insights:**
- **Heavily skewed distribution**: The 5000-5099 range dominates with 30,732 occurrences (roughly 77% of total data)
- **Rapid decline pattern**: Each subsequent range shows dramatically fewer occurrences
- **Geographic concentration**: Suggests data is concentrated in a specific postal area (likely South Australia, based on 5000-series postcodes
![Postcode Numeric Histogram Table (inline buckets)](UserProfilesNow/histograms/histogram-postcodeNumeric-inlineBuckets-table.png)

#### Year of Birth Histogram Table (inline buckets)
Creates a histogram of user year of birth. The histogram's buckets and counts are visualised as a table. The buckets are defined using inline buckets. The three buckets are for years up to 1975, from 1975 to 2000, and from 2000 onwards.
```json
{
  "columnNames": [
    "yearOfBirth",
    "count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "histogram": {
              "buckets": [
                {
                  "to": 1975
                },
                {
                  "from": 1975,
                  "to": 2000
                },
                {
                  "from": 2000
                }
              ]
            }
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "histogram": "yearOfBirth"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Creates a histogram of user year of birth. The histogram's buckets and counts are visualised as a table. The buckets are defined using inline buckets. The three buckets are for years up to 1975, from 1975 to 2000, and from 2000 onwards."
    },
    "type": "Table",
    "title": "Year of Birth Histogram Table (inline buckets)"
  }
}
```


**Visualization Preview:** This is a **histogram table** that displays the distribution of birth years across three time periods using inline bucket formatting.

**Data Display:**
- **Chart Type:** Tabular histogram with grouped year ranges
- **Categories:** Three birth year buckets (0-1975, 1975-2000, 2000+)
- **Counts:** 1,360, 4,142, and 1,953 respectively
- **Total Sample:** 7,455 individuals

**Key Insights:**
- The **1975-2000 cohort is dominant**, representing over half the population (55.6%)
- The **pre-1975 and post-2000
![Year of Birth Histogram Table (inline buckets)](UserProfilesNow/histograms/histogram-yearOfBirth-inlineBuckets.png)


### Main Widgets
#### Age in Years
Age in Years
```json
{
  "columnNames": [
    "Age in Years",
    "Count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "ageInYears"
          },
          "sortSpecification": {
            "ascending": true,
            "priority": 1
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Age in Years"
    },
    "type": "BarChart",
    "title": "Age in Years",
    "tableSettings": {
      "paginate": true,
      "scrollOverflow": true
    }
  }
}
```


**Visualization Preview:** This is a histogram (bar chart) showing the distribution of ages in years across a population. 

**Chart Type:** Histogram with age groups on the x-axis (ranging from 100 to 92 years - likely meant to be 0 to 92 years) and frequency counts on the y-axis (up to 500).

**Data Display:** The chart shows population counts for different age groups, with bars representing the number of individuals in each age bracket.

**Key Insights:**
- The distribution shows a classic demographic pyramid pattern, heavily skewed toward younger ages
- Peak population occurs around ages 25-27, with the highest bar reaching nearly 500 individuals
- There's
![Age in Years](UserProfilesNow/ageInYears.png)

#### Country And State
Count registrations by country and state
```json
{
  "columnNames": [
    "Country",
    "State",
    "Count"
  ],
  "keyAliases": {
    "country": [
      "Australia",
      "United States"
    ]
  },
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "country"
          },
          "sortSpecification": {
            "ascending": true,
            "priority": 1
          }
        },
        {
          "dimension": {
            "key": "state"
          },
          "sortSpecification": {
            "ascending": true,
            "priority": 2
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Count registrations by country and state"
    },
    "type": "Table",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```

#### Country Calling Codes
Count registrations by County Calling Code
```json
{
  "columnNames": [
    "Country",
    "Calling Code",
    "Count"
  ],
  "keyAliases2": {
    "country": [
      "Australia"
    ],
    "state": [
      "new south wales"
    ]
  },
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "country"
          }
        },
        {
          "dimension": {
            "key": "countryCallingCode"
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            }
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Count registrations by County Calling Code"
    },
    "type": "Table",
    "title": "Country Calling Codes",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```

#### Device Category
Device categories
```json
{
  "columnNames": [
    "Device Category",
    "Count"
  ],
  "keyAliases": {
    "country": [
      "Australia",
      "United States"
    ]
  },
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "deviceCategory"
          },
          "sortSpecification": {
            "ascending": true,
            "priority": 1
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Device categories"
    },
    "type": "PieChart",
    "title": "Device Category"
  }
}
```

#### Email
Subscribed registrations with Email
```json
{
  "keyAliases": {
    "hasEmail": [
      "true"
    ],
    "status": [
      "subscribed"
    ]
  },
  "columnNames": [
    "Email"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Subscribed registrations with Email"
    },
    "type": "Number",
    "title": "Email"
  }
}
```

#### ACP - Visitor AND Gender:MALE AND postcode:5000
Group registrations by Single Choice Extended Attribute answers
```json
{
  "columnNames": [
    "Count"
  ],
  "keyAliases": {
    "extendedAttribute:551": [
      "ACP - Visitor"
    ],
    "gender": [
      "MALE"
    ],
    "postcode": [
      "5000"
    ]
  },
  "rowSets": [
    {
      "columns": [
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            }
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Group registrations by Single Choice Extended Attribute answers"
    },
    "type": "Number",
    "title": "ACP - Visitor AND Gender:MALE AND postcode:5000",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```

#### Single Choice Attribute
Group registrations by Single Choice Extended Attribute answers
```json
{
  "columnNames": [
    "Answer",
    "Gender",
    "Count"
  ],
  "keyAliases": {
    "extendedAttribute:551": [
      "ACP Local Resident"
    ]
  },
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "extendedAttribute:551"
          }
        },
        {
          "dimension": {
            "key": "country"
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            }
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Group registrations by Single Choice Extended Attribute answers"
    },
    "type": "Table",
    "title": "Single Choice Attribute",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```

#### Gender Distribution (columns, missing values)
Demo grouping gender into columns.  Missing values are included.
```json
{
  "visualisation": {
    "type": "Table",
    "title": "Gender Distribution (columns, missing values)",
    "description": {
      "html": "Demo grouping gender into columns.  Missing values are included."
    },
    "imageFile": "",
    "tableSettings": {
      "columnSettings": {},
      "paginate": false,
      "scrollOverflow": true
    }
  },
  "columnNames": [
    {
      "name": "gender",
      "dimension": {
        "key": "gender",
        "missing": true
      }
    }
  ],
  "rowSets": [
    {
      "columns": [
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            }
          }
        }
      ]
    }
  ]
}
```


**Visualization Preview:** This is a horizontal bar chart showing gender distribution data with four categories displayed as columns. The visualization presents:

**Chart Type**: Horizontal bar chart with categorical breakdown

**Data Displayed**:
- Female: 33,266 (largest segment)
- Male: 14,050 
- Missing: 5,317
- Other: 5,690

**Key Insights**:
- Females represent the majority at approximately 57% of the total dataset
- There's a significant gender imbalance with females outnumbering males by more than 2:1
- Notable data quality issue with 5,317 missing values
- The "Other" category (5,690
![Gender Distribution (columns, missing values)](UserProfilesNow/gender-columns-missing.png)

#### Gender Composition
Percentages of Males and Females
```json
{
  "keyAliases": {
    "gender": [
      "MALE",
      "FEMALE"
    ]
  },
  "columnNames": [
    "gender",
    "percentage"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "gender"
          }
        },
        {
          "numericExpression": {
            "$divide": [
              {
                "metric": "UserProfilesNow",
                "value": {
                  "counter": "total"
                }
              },
              {
                "metric": "UserProfilesNow",
                "value": {
                  "counter": "total"
                },
                "aggregateAcross": [
                  {
                    "key": "gender"
                  }
                ]
              }
            ]
          },
          "unit": "percentage",
          "decimalPlaces": 2
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Percentages of Males and Females"
    },
    "type": "MultiNumber",
    "title": "Gender Composition"
  }
}
```

#### M
Count Male registrations
```json
{
  "keyAliases": {
    "gender": [
      "MALE"
    ]
  },
  "columnNames": [
    "Males"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Count Male registrations"
    },
    "type": "Number",
    "title": "M"
  }
}
```

#### Gender Stats
Count registrations
```json
{
  "columnNames": [
    "gender",
    "count",
    "total",
    "percentage"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "gender"
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            }
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            },
            "aggregateAcross": [
              {
                "key": "gender"
              }
            ]
          }
        },
        {
          "numericExpression": {
            "$divide": [
              {
                "metric": "UserProfilesNow",
                "value": {
                  "counter": "total"
                }
              },
              {
                "metric": "UserProfilesNow",
                "value": {
                  "counter": "total"
                },
                "aggregateAcross": [
                  {
                    "key": "gender"
                  }
                ]
              }
            ]
          },
          "unit": "percentage",
          "decimalPlaces": 2
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Count registrations"
    },
    "type": "Table",
    "title": "Gender Stats"
  }
}
```

#### Non-English Languages
Top 5 non-english languages
```json
{
  "columnNames": [
    "Language",
    "Count"
  ],
  "keyAliases": {
    "language": [
      "zh",
      "de",
      "fr",
      "nl",
      "it"
    ]
  },
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "language"
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            }
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Top 5 non-english languages"
    },
    "type": "PieChart",
    "title": "Non-English Languages"
  }
}
```

#### List Size
Subscribed and Unsubscribed users by Marketing List (and registration status is subscribed)
```json
{
  "columnNames": [
    "Status",
    "Count"
  ],
  "keyAliases": {
    "status": [
      "subscribed",
      "unsubscribed"
    ]
  },
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "ml"
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            }
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Subscribed and Unsubscribed users by Marketing List (and registration status is subscribed)"
    },
    "type": "Table",
    "title": "List Size",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```

#### Non-English Languages
Top 5 non-english locale
```json
{
  "columnNames": [
    "Locale",
    "Count"
  ],
  "keyAliases": {
    "language": [
      "zh",
      "de",
      "fr",
      "nl",
      "it"
    ]
  },
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "locale"
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            }
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Top 5 non-english locale"
    },
    "type": "PieChart",
    "title": "Non-English Languages"
  }
}
```

#### OS Category (Android & Apple)
OS categories
```json
{
  "columnNames": [
    "OS",
    "Count"
  ],
  "keyAliases": {
    "osCategory": [
      "Android",
      "IOS_OSX"
    ]
  },
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "osCategory"
          },
          "sortSpecification": {
            "ascending": true,
            "priority": 1
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "OS categories"
    },
    "type": "Table",
    "title": "OS Category (Android & Apple)"
  }
}
```


**Visualization Preview:** This is a **data table visualization** showing operating system distribution between Android and Apple devices.

**Data displayed:**
- Android: 22,658 users
- iOS/OSX: 27,496 users
- Total sample size: ~50,154 users

**Key insights:**
- iOS/OSX has a slight majority with 54.8% of users compared to Android's 45.2%
- The distribution is relatively balanced between the two major mobile/desktop ecosystems
- iOS/OSX leads by approximately 4,838 users

The visualization uses a clean, minimalist table format with sorting capabilities (indicated by the diamond sorting icons), making it easy to compare the two
![OS Category (Android & Apple)](UserProfilesNow/os-categories.png)

#### Postcodes
Postcode 
```json
{
  "columnNames": [
    "Postcode",
    "Count",
    "total",
    "ratio"
  ],
  "keyAliases": {
    "country": [
      "Australia"
    ],
    "postcode": [
      "5000",
      "5082",
      "5066",
      "5067",
      "5085",
      "5006",
      "5072",
      "5065",
      "5063",
      "5070",
      "5073",
      "5068",
      "5061",
      "5062",
      "5081",
      "5069",
      "5008",
      "5064",
      "5031",
      "5022"
    ]
  },
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "postcode"
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            },
            "aggregateAcross": [
              {
                "key": "postcode"
              }
            ]
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            }
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        },
        {
          "numericExpression": {
            "$divide": [
              {
                "metric": "UserProfilesNow",
                "value": {
                  "counter": "total"
                }
              },
              {
                "metric": "UserProfilesNow",
                "value": {
                  "counter": "total"
                },
                "aggregateAcross": [
                  {
                    "key": "postcode"
                  }
                ]
              }
            ]
          },
          "unit": "percentage",
          "decimalPlaces": 2
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Postcode "
    },
    "type": "Table",
    "title": "Postcodes",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```

#### Postcodes
Count registrations by NSW Postcodes
```json
{
  "columnNames": [
    "Postcode",
    "Count"
  ],
  "keyAliases": {
    "country": [
      "Australia"
    ]
  },
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "postcode"
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            }
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Count registrations by NSW Postcodes"
    },
    "type": "Table",
    "title": "Postcodes",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```

#### Single Choice Attribute
Group registrations by Single Choice Extended Attribute answers
```json
{
  "columnNames": [
    "Answer",
    "Count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "extendedAttribute:551"
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            }
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Group registrations by Single Choice Extended Attribute answers"
    },
    "type": "Table",
    "title": "Single Choice Attribute",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```

#### Registration Status
Registration Status
```json
{
  "columnNames": [
    "Status",
    "Count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "status"
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            }
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Registration Status"
    },
    "type": "PieChart",
    "title": "Registration Status",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```

#### Subscribers
Opted-in Subscribers by Marketing List (and registration status is subscribed)
```json
{
  "columnNames": [
    "Status",
    "Count"
  ],
  "keyAliases": {
    "status": [
      "subscribed"
    ]
  },
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "mlSub"
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            }
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Opted-in Subscribers by Marketing List (and registration status is subscribed)"
    },
    "type": "Table",
    "title": "Subscribers",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```

#### Suburbs
Count registrations by Australian Suburbs
```json
{
  "columnNames": [
    "Suburbs",
    "Count"
  ],
  "keyAliases": {
    "country": [
      "Australia"
    ]
  },
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "suburb"
          },
          "sortSpecification": {
            "ascending": true,
            "priority": 1
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Count registrations by Australian Suburbs"
    },
    "type": "PieChart",
    "title": "Suburbs",
    "tableSettings": {
      "paginate": false,
      "scrollOverflow": true
    }
  }
}
```

#### Year of Birth
Year of Birth
```json
{
  "columnNames": [
    "Year",
    "Count"
  ],
  "rowSets": [
    {
      "columns": [
        {
          "dimension": {
            "key": "yearOfBirth"
          },
          "sortSpecification": {
            "ascending": false,
            "priority": 1
          }
        },
        {
          "numericExpression": {
            "metric": "UserProfilesNow",
            "value": {
              "counter": "total"
            }
          }
        }
      ]
    }
  ],
  "visualisation": {
    "description": {
      "html": "Year of Birth"
    },
    "type": "Table",
    "title": "Year of Birth",
    "tableSettings": {
      "paginate": true,
      "scrollOverflow": true
    }
  }
}
```


## UserProfilesRegistrationGroup
#### Table
A table
```json
{
  "visualisation": {
    "type": "Table",
    "title": "Table",
    "description": {
      "html": "A table"
    },
    "imageFile": "",
    "tableSettings": {
      "columnSettings": {},
      "paginate": false,
      "scrollOverflow": true
    }
  },
  "columnNames": [
    {
      "name": "AGE",
      "dimension": {
        "segment": "AGE"
      }
    }
  ],
  "rowSets": [
    {
      "columns": [
        {
          "numericExpression": {
            "metric": "UserProfilesRegistrationGroup",
            "value": {
              "counter": "total"
            }
          }
        }
      ]
    }
  ]
}
```


