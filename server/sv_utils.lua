---comment
---@return table | any
LoadLeaderboard = function()
    local leaderboardJson = LoadResourceFile(GetCurrentResourceName(), "data.json")

    if not leaderboardJson then return Debug("[func:LoadLeaderboard] leaderboardJson is null.") end

    return json.decode(leaderboardJson)
end

SaveLeaderboard = function(newLeaderboardTable)
    SaveResourceFile(GetCurrentResourceName(), "data.json", json.encode(newLeaderboardTable, { indent = false }), -1)
end

ShowNotification = function(data)
    if not data then return Debug("[func:server:ShowNotification] first param is null.") end

    if not data.target then Debug("[func:server:ShowNotification] data.target is null.") end

    TriggerClientEvent("UIMessage", data.target, "nui:notify", data)
end

GetDiscordID = function(source)
    local returnValue = nil
    for idIndex = 1, GetNumPlayerIdentifiers(source) do
        if GetPlayerIdentifier(source, idIndex) ~= nil and GetPlayerIdentifier(source, idIndex):sub(1, #("discord:")) == "discord:" then
            returnValue = GetPlayerIdentifier(source, idIndex):gsub("discord:", "")
        end
    end
    return returnValue
end

GetPlayerIdentifiersWithoutIP = function(player)
    local identifiers = GetPlayerIdentifiers(player)
    local cleanedIdentifiers = {}
    for _, identifier in ipairs(identifiers) do
        if not string.find(identifier, "ip:") then
            table.insert(cleanedIdentifiers, identifier)
        end
    end
    return cleanedIdentifiers
end

-- Copy and pasta for VersionChecker func from ox_lib Credit: "https://github.com/overextended/ox_lib"
VersionCheck = function(repository)
    local resource = GetInvokingResource() or GetCurrentResourceName()

    local currentVersion = 'v1.0.1'

    if currentVersion then
        currentVersion = currentVersion:match('%d+%.%d+%.%d+')
    end

    if not currentVersion then
        return print(("^1Unable to determine current resource version for '%s' ^0"):format(
            resource))
    end

    SetTimeout(1000, function()
        PerformHttpRequest(('https://api.github.com/repos/%s/releases/latest'):format(repository),
            function(status, response)
                if status ~= 200 then return end

                response = json.decode(response)
                if response.prerelease then return end

                local latestVersion = response.tag_name:match('%d+%.%d+%.%d+')
                if not latestVersion or latestVersion == currentVersion then return end

                local cv = { string.strsplit('.', currentVersion) }
                local lv = { string.strsplit('.', latestVersion) }

                for i = 1, #cv do
                    local current, minimum = tonumber(cv[i]), tonumber(lv[i])

                    if current ~= minimum then
                        if current < minimum then
                            return print(('^3An update is available for %s (current version: %s)\r\n%s^0'):format(
                                resource, currentVersion, response.html_url))
                        else
                            break
                        end
                    end
                end
            end, 'GET')
    end)
end

if not LoadResourceFile(GetCurrentResourceName(), 'web/dist/index.html') then
    local err =
    'Unable to load UI. Build vReports or download the latest release.\n https://github.com/vipexv/vReports/releases/latest'
    print(err)
end

VersionCheck("vipexv/vReports")
