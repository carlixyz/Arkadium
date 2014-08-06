#include "Brick.h"
Brick::Brick(){
}
Brick::~Brick(){
}
bool Brick::Initialize(){
	SetColor(0xFF000000);
	SetShape(ZAK_SHAPE_QUAD);
	SetDim(50,20);
	SetCheckCollision(true);
	return true;
}
void Brick::OnCollide(Entity2D *entity){
	SetVisible(false);
	SetCheckCollision(false);
}