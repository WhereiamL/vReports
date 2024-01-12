import { Divider, SegmentedControl } from "@mantine/core";
import { Flag, ShieldAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import { MdLeaderboard } from "react-icons/md";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { isEnvBrowser } from "../utils/misc";
import "./App.css";
import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Reports from "./reports";

debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

interface views {
  [key: string]: React.ComponentType;
}

const views: views = {
  reports: Reports,
};

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState("reports");

  const CurrentView = views[currentTab];

  useNuiEvent<boolean>("setVisible", setVisible);

  useEffect(() => {
    if (!visible) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (["Backspace", "Escape"].includes(e.code)) {
        if (!isEnvBrowser()) fetchNui("hideFrame");
        else setVisible(!visible);
      }
    };

    window.addEventListener("keydown", keyHandler);

    return () => window.removeEventListener("keydown", keyHandler);
  }, [visible]);

  return (
    <>
      <div className="flex w-[100dvw] h-[100dvh] justify-center items-center">
        <div className="min-w-[50dvw] min-h-[35dvw] bg-primary rounded-[2px]">
          <div className="flex items-center">
            <h1 className="m-2 relative flex justify-center bg-secondary items-center rounded px-4 py-1 font-main text-white text-lg border-[2px]">
              <ShieldAlert size={18} className="mr-1 text-blue-400" />
              Report Menu
            </h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="border-[2px] rounded bg-secondary hover:bg-primary text-white ml-auto mr-1">
                  <User size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-primary border-[2px]">
                <DropdownMenuLabel>Profile</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Keyboard className="mr-2 h-4 w-4" />
                    <span>Keyboard shortcuts</span>
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Team</span>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Invite users</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="bg-primary border-[2px]">
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>Message</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          <span>More...</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    <Plus className="mr-2 h-4 w-4" />
                    <span>New Team</span>
                    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Github className="mr-2 h-4 w-4" />
                  <span>GitHub</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <Cloud className="mr-2 h-4 w-4" />
                  <span>API</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Divider size="xs" />

          <div className="flex flex-col items-center mt-2">
            <SegmentedControl
              className="border-[2px] bg-secondary m-auto mb-2"
              value={currentTab}
              onChange={(e) => {
                setCurrentTab(e);
              }}
              data={[
                {
                  value: "reports",
                  label: (
                    <>
                      <div className="flex justify-center items-center gap-1 text-white">
                        <Flag
                          size={14}
                          className="text-red-500"
                          strokeWidth={3}
                        />
                        Reports
                      </div>
                    </>
                  ),
                },
                {
                  value: "leaderboard",
                  label: (
                    <>
                      <div className="flex justify-center items-center gap-1 text-white">
                        <MdLeaderboard size={14} className="text-yellow-500" />
                        Leaderboard
                      </div>
                    </>
                  ),
                },
              ]}
            />
            <div className="flex">
              <input
                type="text"
                className="outline-none w-full h-full border-[2px] bg-secondary ml-auto py-[5px] px-[5px] rounded focus:border-blue-400 transition-all"
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="border-[2px] flex justify-center items-center h-[55dvh] rounded m-10 mt-5">
            {CurrentView && <CurrentView />}
          </div>
          <p className="font-main flex justify-end m-2">v1.0.0</p>
        </div>
      </div>
    </>
  );
};

export default App;
