#include "game.h"
TestGame::TestGame() {
}
TestGame::~TestGame() {
}
bool TestGame::OnInit() {
		
		_clearScreen = true;

		_shape.SetDim(100,100);
		_shape.SetPos(0,0);
		_shape.SetColor(0xFF0000FF);
		_shape.SetShape(ZAK_SHAPE_QUAD);

		g_renderer.SetViewPosition((unsigned int)(g_renderer.GetViewPortWidth()/2),
			(unsigned int)(g_renderer.GetViewPortHeight()/2));
		g_renderer.SetFont(FT_VERDANA);
		g_renderer.SetFontColor(0xFFFF0000);

		_speedX = 0.0f;
		_speedY = 0.0f;

		return true;
}
void TestGame::OnFrame() {

	_posX = _shape.GetPosX();
	_posY = _shape.GetPosY();

	_speedX = 0.0f;
	_speedY = 0.0f;

	if (KeyDown(DIK_ESCAPE))
		PostQuitMessage(0); //escape para salír

	// si presiono cursor izquierda
	if (KeyPressed(DIK_LEFT)){
		_speedX = -SPEED;

	//si presionamos derecha
	} else if (KeyPressed(DIK_RIGHT)){
		_speedX = SPEED;
	}

	//si presionamos cursor arriba
	if (KeyPressed(DIK_UP)){
		_speedY = SPEED;

	// si presionamos cursor abajo;
	} else if (KeyPressed(DIK_DOWN)){
		_speedY = -SPEED;
	}

	// si muevo el mouse
	if (MouseRelPosf(ZAK_INPUT_MOUSE_POS_X) != 0.0f) {
		_posX += MouseRelPosf(ZAK_INPUT_MOUSE_POS_X);
	}

	// Si muevo el mouse en el eje Y
	if (MouseRelPosf(ZAK_INPUT_MOUSE_POS_Y) != 0.0f) {
		_posY += MouseRelPosf(ZAK_INPUT_MOUSE_POS_Y);
	}

	// Si hay algún joyStick conectado
	if (JoystickCount() > 0) {
		
		//Verifico si la posición del joystick es diferente del centro
		if (JoystickPosf(0, ZAK_INPUT_POS_X) != 0.0f) {
			
			// Muevo el elemento respecto de la posición del Joystick
			_speedX = JoystickPosf(0 , ZAK_INPUT_POS_X)/1024*SPEED;
		}
			//Verifico si la posición del joystick es diferente del centro en Y
		if (JoystickPosf(0, ZAK_INPUT_POS_Y) != 0.0f) {
			
			// Muevo el elemento respecto de la posición del Joystick
			_speedY = JoystickPosf(0 , ZAK_INPUT_POS_Y)/1024*SPEED;
		}
	}

	// Actualizamos la posición
	_posX += _speedX*(float)_fpsMeter.GetDT();
	_posY += _speedY*(float)_fpsMeter.GetDT();

	_shape.SetPos(_posX, _posY);
	_shape.Update((float)_fpsMeter.GetDT());
}
void TestGame::OnDraw() {
	_shape.Draw();

	wstringstream ss;

	ss << "ArKadiuM dev. versión - "<<ZAK_ENGINE_NAME << endl << "FPS(facu puto selacome): " << _fpsMeter.GetFps() << endl;

	ss << "JoyX: " << JoystickPosf(0, ZAK_INPUT_POS_X) << " - JoyY: " << JoystickPosf(0, ZAK_INPUT_POS_Y) << endl;

	ss << "MouseAbsPosX: " << MouseAbsPosf(ZAK_INPUT_POS_X) << " MouseAbsPosY: " << MouseAbsPosf(ZAK_INPUT_POS_Y) << endl;

	ss << "MouseWorldPosX: " << MouseWorldPosf(ZAK_INPUT_POS_X) << " MouseWorldPosY: " << MouseWorldPosf(ZAK_INPUT_POS_Y) << endl;

	g_renderer.DrawString(ss.str(),10,10,800-20,600-20,ZAK_TEXT_LEFT);

}

bool TestGame::OnShutdown() {
return true;
}