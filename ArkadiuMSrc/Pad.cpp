#include "Pad.h"

Pad::Pad() {
	_vx = 0.0f;
	_currentAction = 0;
}
Pad::~Pad() {
}
bool Pad::Initialize() {
	SetShape(ZAK_SHAPE_QUAD);
	SetDim(100,20);
	SetPos(0,-250);
	SetColor(0xFFFF0000);
	SetCollisionType(Entity2D::eCollisionBBox);
	SetCollisionSize(100,20);
	SetCollisionPos(0,0);
	SetCheckCollision(true); //Deseamos chequear colisión

	return true;
}

void Pad::OnCollide(Entity2D *entity) {
	SetToPreviousPosition();
}
void Pad::Update(float dt) {
	float x = GetPosX();
	float w = (float) g_renderer.GetViewPortWidth()/2;
	float h = (float) g_renderer.GetViewPortHeight()/2;

	Shape::Update(dt);

	//Chequeo la acción actual
	if (_currentAction == MOVING) {
		x += _vx*dt;
	}

	//Verifico si estoy fuera del margen derecho
	if (x > w-GetWidth()/2)
		x = w-GetWidth()/2;

	//Verifico si estoy fuera del margen izquierdo
	if (x < -w+GetWidth()/2)
		x = -w+GetWidth()/2;

	SetPosX(x);
}

