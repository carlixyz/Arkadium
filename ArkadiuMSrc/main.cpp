#include "ArkadiuM.h"

#ifdef _DEBUG
#pragma comment(lib, "zakengined.lib")
int main() {
#else
#pragma comment(lib, "zakengine.lib")
INT WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nShowCmd) {
#endif

   ArkadiuM game;

 GameConfig config; 

  if (!config.Load("config.ini"))
      return false;

if (game.StartUp(&config)) {
      game.Loop();
   } else {
      game.Shutdown();

     // MessageBoxA(g_window.GetHWnd(),Log.GetLastMessage(),"Error",MB_ICONERROR|MB_OK);

      return 1;
   }

   if (!game.Shutdown()) {

     // MessageBoxA(g_window.GetHWnd(),Log.GetLastMessage(),"Error",MB_ICONERROR|MB_OK);
      return 1;
   }
   
   return 0;
} 