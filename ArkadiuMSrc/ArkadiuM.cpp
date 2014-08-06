#include "ArkadiuM.h"

ArkadiuM::ArkadiuM() {
}
ArkadiuM::~ArkadiuM() {
}
bool ArkadiuM::OnInit() {
		
		_clearScreen = true; //borramos la pantalla

		// Inicializamos color de fondo
		g_renderer.SetClearColor(0xFFFFFFFF);
		
		//Inicializamos da boll
		if (!_ball.Initialize())
			return false;
		// and da Pad
		if (!_pad.Initialize())
			return false;

		//Recorro el array e inicializo los ladrillos
		for (int y=0; y<BRICKS_FILES; y++) {
			for (int x=0; x < BRICKS_PER_SIDE; x++) {

				//Inicializo el ladrillo
				if (!_bricks[y*BRICKS_PER_SIDE+x].Initialize())
					return false;

				// Tomo el ancho y el alto del ladrillo
				float w = _bricks[y*BRICKS_PER_SIDE+x].GetWidth();
				float h = _bricks[y*BRICKS_PER_SIDE+x].GetHeight();

				// Seteo de la posición del ladrillo
				_bricks[y*BRICKS_PER_SIDE+x].SetPos(START_POS_X+x*
					(w+SPACE_BETWEEN_X), START_POS_Y - y*(h+SPACE_BETWEEN_Y));

				//Seteo el color
				_bricks[y*BRICKS_PER_SIDE+x]
				.SetColor(0xFFFF00FF);
			}
		}

		return true;
}
bool ArkadiuM::CheckCollision (Entity2D & entity1, Entity2D & entity2) {
		// Si están activadas las colisiones de ambas entidades, entonces chequeamos colisión
	if (entity1.GetCheckCollision() && entity2.GetCheckCollision()) {
		float x1 = entity1.GetPosX()-entity1.GetWidth()/2;
		float w1 = entity1.GetWidth();
		float y1 = entity1.GetPosY()-entity1.GetHeight()/2;
		float h1 = entity1.GetHeight();

		float x2 = entity2.GetPosX()-entity2.GetWidth()/2;
		float w2 = entity2.GetWidth();
		float y2 = entity2.GetPosY()-entity2.GetHeight()/2;
		float h2 = entity2.GetHeight();

		// Si ((x1 esta entre x2 y x2+w2) o (x2 esta entre x1 y x1+w1))y ((y1 esta entre y2 y y2+h2) o (y2 esta entre y1 y y1+h1))
		if (((x1 < x2+w2 && x1 > x2) || (x2 < x1+w1 && x2 > x1)) &&
			((y1 < y2+h2 && y1 > y2) || (y2 < y1+h1 && y2 > y1)))
			
			// entonces hubo colisión
			return true;
	}

	// No hubo colisión
	return false;
}
void ArkadiuM::OnFrame() {

	if (KeyDown(DIK_ESCAPE)){
		PostQuitMessage(0);
	} //escape para salír

	_pad.SetAction(MOVE_NONE);

	// si presioné cursor izquierda
	if (KeyPressed(DIK_LEFT)){

			//Muevo el pad hacia la izquierda
		_pad.SetAction(MOVING, -0.4f);

	//si presioné cursor derecha
	} else if (KeyPressed(DIK_RIGHT)){

			//Muevo el pad hacia la derecha
		_pad.SetAction(MOVING, 0.4f);

	// Si muevo el mouse
	}else if (MouseRelPosf(ZAK_INPUT_MOUSE_POS_X) != 0.0f) {

		// Muevo el pad respecto del movimiento del mouse
		_pad.SetPosX(_pad.GetPosX()+MouseRelPosf(ZAK_INPUT_MOUSE_POS_X));

	//Si hay algún Joystick conectado
	} else if (JoystickCount() > 0){

		//Verifico si la posición del joystick es diferente del centro
		if (JoystickPosf(0, ZAK_INPUT_POS_X) != 0) {

			// Muevo el pad respecto de la posición del joystick
			_pad.SetAction(MOVING, (JoystickPosf(0, ZAK_INPUT_POS_X)/1024)*0.4f);
		}
	}

	if ((KeyDown(DIK_SPACE) || MouseClick(ZAK_INPUT_MOUSE_BTN_1) || JoystickButtons(0,1)) && _ball.GetSticky()) {

		_ball.SetSticky(false);
		_ball.SetVX(0.4f);
		_ball.SetVY(-0.4f);
	}
	// Actualizo las entidades
	_pad.Update((float) _fpsMeter.GetDT());

	// Recorro el array de ladrillos para actualizarlos y chequear la colisión
	for (int y=0; y<BRICKS_FILES; y++) {
		for (int x=0; x<BRICKS_PER_SIDE; x++) {

			//Actualizo el ladrillo
			_bricks[y*BRICKS_PER_SIDE+x].Update((float)_fpsMeter.GetDT());

			// Chequeo la colisiónj del ladrillo
			if (CheckCollision(_ball, _bricks[y*BRICKS_PER_SIDE+x])) {
				//En el caso de haber collisión, llamo a los metodos OnCollide de las dos entidades
				_ball.OnCollide(&_bricks[y*BRICKS_PER_SIDE+x]);
				_bricks[y*BRICKS_PER_SIDE+x].OnCollide(&_ball);
			}
		}
	}

	// Si la bola está pegajosa la trasladamos junto con el pad
	if (_ball.GetSticky()){
		_ball.SetPos(_pad.GetPosX(), _pad.GetPosY()+_pad.GetHeight()/2+_ball.GetHeight()/2+2);
		_ball.SetVX(0);
		_ball.SetVY(0);
	}

	_ball.Update((float) _fpsMeter.GetDT());

	// Chequeo la colisión entre la bola y el pad
	if (CheckCollision(_ball, _pad)) {

		// En el caso de haber colisión,llamo a los métodos OnCollide de las dos entidades
		_ball.OnCollide(&_pad); 
		_pad.OnCollide(&_ball);
		
	}
}

void ArkadiuM::OnDraw() {
	
	//Dibujamos las entidades
	_ball.Draw();
	_pad.Draw();

	// Recorremos el array para sibujar los ladrillos
	for (int y=0; y < BRICKS_FILES; y++) {
		for (int x = 0; x < BRICKS_PER_SIDE; x++) {
			_bricks[y*BRICKS_PER_SIDE+x].Draw();
		}
	}
}

bool ArkadiuM::OnShutdown() {
return true;
}